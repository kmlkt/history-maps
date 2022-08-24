import HistoryEvent from "../models/event";
import IEventService from "../services/abstractions/event-service";
import IButtonsView from "./buttons-view";
import IDlView from "./dl-view";
import IInfoView from "./info-view";
import ILabelView from "./label-view";
import IView2d from "./view-2d";
import IView3d from "./view-3d";

class Presenter{
    private eventService: IEventService;
    private continiousEvents: HistoryEvent[]
    private is3d: boolean = true;
    private currentEvent: HistoryEvent;
    
    constructor(eventService: IEventService){
        this.eventService = eventService;
        this.continiousEvents = [];
    }

    async start(view3d: IView3d, view2d: IView2d, infoView: IInfoView, dlView: IDlView, labelView: ILabelView, buttonsView: IButtonsView){
        let paused = false;
        view2d.onHover = labelView.showLabel;
        view2d.onNothingHovered = labelView.hideLabel;
        view3d.onHover = labelView.showLabel;
        view3d.onNothingHovered = labelView.hideLabel;

        buttonsView.onSwitchModeClicked = async () => {
            this.is3d = !this.is3d;
            await this.showView(view3d, view2d, dlView, infoView);
        };
        buttonsView.onPauseClicked = () => {
            paused = !paused;
            buttonsView.setPauseButtonText(paused);
        };

        await this.showView(view3d, view2d, dlView, infoView);

        const events = await this.eventService.getAllEvents();
        await this.loadEvent(view3d, view2d, infoView, events[0]);
        let year = events[0].year;
        let eventId = 0;
        while(next() != null){
            if(paused){
                await this.sleep(100);
            } else{
                infoView.setYear(year);
                if(year == next().year){
                    await this.loadEvent(view3d, view2d, infoView, next());
                    eventId ++;
                }else{
                    await this.sleep(7);
                }
                this.continiousEvents.filter(x => x.endYear == year).forEach(x => this.removeCe(x, infoView));
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

    private async loadEvent(view3d: IView3d, view2d: IView2d, infoView: IInfoView, event: HistoryEvent) {
        this.currentEvent = event;
        infoView.addEvent(event);
        if(this.is3d){
            view3d.setEvent(event,  await this.eventService.getEventCountries(event), 
                await this.eventService.getEventPoints(event), await this.eventService.getEventColors(event));
        }else{
            view2d.setEvent(event, await this.eventService.getEventCountries(event), await this.eventService.getEventBitmapUrl(event));
        }
        await this.sleep(3500);       
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

    private sleep(ms) {
        return new Promise(r => setTimeout(r, ms));
    }

    private async showView(view3d: IView3d, view2d: IView2d, dlView: IDlView, infoView: IInfoView){
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
            await this.loadEvent(view3d, view2d, infoView, this.currentEvent);
        }
    }
}

export default Presenter;