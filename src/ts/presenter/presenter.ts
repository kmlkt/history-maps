import HistoryEvent from "../models/event";
import IEventService from "../services/abstractions/event-service";
import IDlView from "./dl-view";
import IInfoView from "./info-view";
import IView2d from "./view-2d";

class Presenter{
    private eventService: IEventService;
    
    constructor(eventService: IEventService){
        this.eventService = eventService;
    }

    async start(view2d: IView2d, infoView: IInfoView, dlView: IDlView){
        dlView.setDark();
        view2d.show();
        const events = await this.eventService.getAllEvents();
        await this.loadEvent(view2d, infoView, events[0]);
        let year = events[0].year;
        let eventId = 0;
        while(next() != null){
            if(year == next().year){
                await this.loadEvent(view2d, infoView, next());
                eventId ++;
            }else{
                infoView.setYear(year);
                await this.sleep(7);
            }
            year++;
        }

        function next(){
            if(eventId >= events.length){
                return null;
            }
            return events[eventId + 1];
        }
    }

    private async loadEvent(view2d: IView2d, infoView: IInfoView, event: HistoryEvent) {
        view2d.setEvent(event, await this.eventService.getEventBitmapUrl(event));
        infoView.addEvent(event);
        infoView.setYear(event.year);
        await this.sleep(3500);       
        if(event.endYear == null){
            infoView.removeEvent(event);
        } 
    }

    private sleep(ms) {
        return new Promise(r => setTimeout(r, ms));
    }
}

export default Presenter;