import sleep from "../common/sleep";
import Color from "../models/color";
import CountryVm from "../models/country-vm";
import HistoryEvent from "../models/event";
import IEventService from "../services/abstractions/event-service";
import IStorageService from "../services/abstractions/storage-service";
import IBottomInfoView from "./bottom-info-view";
import IButtonsView from "./buttons-view";
import IDlView from "./dl-view";
import IInfoView from "./info-view";
import ILabelView from "./label-view";
import ISpeedDialogView from "./speed-dialog-view";
import IView2d from "./view-2d";
import IView3d from "./view-3d";
import IYearDialogView from "./year-dialog-view";

class Presenter{
    private eventService: IEventService;
    private storageService: IStorageService;
    private continiousEvents: HistoryEvent[]
    private is3d: boolean;
    private inited3d: boolean;
    private currentEvent: HistoryEvent;
    
    constructor(eventService: IEventService, storageService: IStorageService){
        this.eventService = eventService;
        this.storageService = storageService;
        this.continiousEvents = [];
        this.is3d = storageService.get3d() ?? true;
    }

    async start(view3d: IView3d, view2d: IView2d, infoView: IInfoView, dlView: IDlView, labelView: ILabelView, buttonsView: IButtonsView, yearDialogView: IYearDialogView,
        speedDialogView: ISpeedDialogView, bottomInfoView: IBottomInfoView){
        bottomInfoView.init(this.storageService.getBottomInfoVisible() ?? true);
        bottomInfoView.onClose = () => {
            this.storageService.setBottomInfoVisible(false);
        };
        
        const events = await this.eventService.getAllEvents();
        let speed = this.storageService.getSpeed() ?? 3;
        let year = events[0].year;
        let eventId = 0;

        let paused = false;
        view2d.onHover = labelView.showLabel;
        view2d.onNothingHovered = labelView.hideLabel;
        view3d.onHover = labelView.showLabel;
        view3d.onNothingHovered = labelView.hideLabel;

        buttonsView.onSwitchModeClicked = async () => {
            this.is3d = !this.is3d;
            this.storageService.set3d(this.is3d);
            await this.showView(view3d, view2d, dlView, infoView, speed);
        };
        buttonsView.onPauseClicked = () => {
            paused = !paused;
            buttonsView.setPauseButtonText(paused);
        };
        buttonsView.onChangeYearClicked = () => {
            paused = true;
            yearDialogView.show(year);
        }
        buttonsView.onSpeedClicked = () => {
            paused = true;
            speedDialogView.show(speed);
        }

        yearDialogView.onOkClicked = async (y: number) => {
            if(y < events[0].year){
                y = events[0].year;
            }
            if(y > events[events.length - 1].year){
                y = events[events.length -1].year;
            }
            this.continiousEvents = [];
            infoView.clearAllEvents();
            year = y;
            infoView.setYear(y);
            const prevEvents = events.filter(x => x.year <= y).sort((x, y) => x.year - y.year);
            const prevEvent = prevEvents[prevEvents.length - 1];

            const current = events.find(x => x.year == y);
            if(current != null){
                infoView.addEvent(current);
            }
            this.continiousEvents = events.filter(x => x.year <= y && x.endYear != null && x.endYear >= y);
            this.continiousEvents.forEach(x => infoView.addEvent(x));

            if(this.is3d){
                const countries = await this.eventService.getEventCountries(prevEvent);
                const viewModels = countries.filter(x => x.name != 'water').map(async country => {
                    return new CountryVm(country.name, country.color, 
                        await this.eventService.getCountryPoints(prevEvent, country));
                });
                view3d.setEvent(prevEvent, await Promise.all(viewModels));
            }else{
                view2d.setEvent(prevEvent, await this.eventService.getEventCountries(prevEvent), await this.eventService.getEventBitmapUrl(prevEvent));
            }
            eventId = events.indexOf(prevEvent);
            paused = false;
            year += 1;
            infoView.setYear(year);
            if(current != null && current.endYear == null){
                infoView.removeEvent(current);
            }
        };
        yearDialogView.onCancelClicked = () => {
            paused = false;
        };

        speedDialogView.onOkClicked = (s: number) => {
            speed = s;
            this.storageService.setSpeed(speed);
            paused = false;
        };
        speedDialogView.onCancelClicked = () => {
            paused = false;
        };

        await this.showView(view3d, view2d, dlView, infoView, speed);
        await this.loadEvent(view3d, view2d, infoView, events[0], speed);

        while(true){
            if(paused || next() == null){
                await sleep(100);
            } else{
                infoView.setYear(year);
                if(year == next().year){
                    await this.loadEvent(view3d, view2d, infoView, next(), speed);
                    eventId ++;
                }else{
                    await sleep(31 - 3 * speed);
                }
                this.continiousEvents.filter(x => x.endYear < year).forEach(x => this.removeCe(x, infoView));
                year++;
            }
        }

        function next(){
            if(eventId >= events.length){
                return null;
            }
            return events[eventId + 1];
        }
    }

    private async loadEvent(view3d: IView3d, view2d: IView2d, infoView: IInfoView, event: HistoryEvent, speed: number) {
        if(!this.inited3d && this.is3d){
            await view3d.setBaseWorld(
                new CountryVm('blank', new Color(255, 255, 255), await this.eventService.getBaseWorldBlank()),
                new CountryVm('water', new Color(0, 162, 232), await this.eventService.getBaseWorldWater()))
            this.inited3d = true;
        }
        this.currentEvent = event;
        infoView.addEvent(event);
        if(this.is3d){
            const countries = await this.eventService.getEventCountries(event);
            const viewModels = countries.filter(x => x.name != 'water').map(async country => {
                return new CountryVm(country.name, country.color, 
                    await this.eventService.getCountryPoints(event, country));
            });
            view3d.setEvent(event, await Promise.all(viewModels));
        }else{
            view2d.setEvent(event, await this.eventService.getEventCountries(event), await this.eventService.getEventBitmapUrl(event));
        }
        await sleep(3500 - 300 * speed);       
        if(event.endYear == null){
            infoView.removeEvent(event);
        } else{
            this.continiousEvents.push(event);
        }
    }

    private removeCe(ce: HistoryEvent, infoView: IInfoView){
        infoView.removeEvent(ce);
        this.continiousEvents = this.continiousEvents.filter(x => x != ce);
    }

    private async showView(view3d: IView3d, view2d: IView2d, dlView: IDlView, infoView: IInfoView, speed: number){
        if(this.is3d){
            dlView.setLight();
            view2d.hide();
            view3d.show();
        } else{
            dlView.setDark();
            view3d.hide();
            view2d.show();
        }

        if(this.currentEvent != undefined){
            await this.loadEvent(view3d, view2d, infoView, this.currentEvent, speed);
        }
    }
}

export default Presenter;