import HistoryEvent from "../models/event";
import IEventService from "../services/abstractions/event-service";
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
    private continiousEvents: HistoryEvent[]
    private is3d: boolean = true;
    private currentEvent: HistoryEvent;
    
    constructor(eventService: IEventService){
        this.eventService = eventService;
        this.continiousEvents = [];
    }

    async start(view3d: IView3d, view2d: IView2d, infoView: IInfoView, dlView: IDlView, labelView: ILabelView, buttonsView: IButtonsView, yearDialogView: IYearDialogView,
        speedDialogView: ISpeedDialogView){
        const events = await this.eventService.getAllEvents();
        let speed = 3;
        let year = events[0].year;
        let eventId = 0;

        let paused = false;
        view2d.onHover = labelView.showLabel;
        view2d.onNothingHovered = labelView.hideLabel;
        view3d.onHover = labelView.showLabel;
        view3d.onNothingHovered = labelView.hideLabel;

        buttonsView.onSwitchModeClicked = async () => {
            this.is3d = !this.is3d;
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
                view3d.setEvent(prevEvent,  await this.eventService.getEventCountries(prevEvent), 
                    await this.eventService.getEventPoints(prevEvent), await this.eventService.getEventColors(prevEvent));
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
            paused = false;
        };
        speedDialogView.onCancelClicked = () => {
            paused = false;
        };

        await this.showView(view3d, view2d, dlView, infoView, speed);
        await this.loadEvent(view3d, view2d, infoView, events[0], speed);

        while(true){
            if(paused || next() == null){
                await this.sleep(100);
            } else{
                infoView.setYear(year);
                if(year == next().year){
                    await this.loadEvent(view3d, view2d, infoView, next(), speed);
                    eventId ++;
                }else{
                    await this.sleep(31 - 3 * speed);
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
        this.currentEvent = event;
        infoView.addEvent(event);
        if(this.is3d){
            await view3d.setEvent(event,  await this.eventService.getEventCountries(event), 
                await this.eventService.getEventPoints(event), await this.eventService.getEventColors(event));
        }else{
            view2d.setEvent(event, await this.eventService.getEventCountries(event), await this.eventService.getEventBitmapUrl(event));
        }
        await this.sleep(3500 - 300 * speed);       
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

    private sleep(ms: number) {
        return new Promise(r => setTimeout(r, ms));
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