import Country from "../../models/country";
import HistoryEvent from "../../models/event";

interface IEventService{
    getEventBitmapUrl(event: HistoryEvent): Promise<string>;
    getEventPoints(event: HistoryEvent): Promise<Float64Array>;
    getEventColors(event: HistoryEvent): Promise<Float64Array>;
    getEventCountries(event: HistoryEvent): Promise<Array<Country>>;
    getAllEvents(): Promise<Array<HistoryEvent>>;
}

export default IEventService;