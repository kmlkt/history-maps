import Country from "../../models/country";
import HistoryEvent from "../../models/event";

interface IEventService{
    getEventBitmapUrl(event: HistoryEvent): Promise<string>;
    getCountryPoints(event: HistoryEvent, country: Country): Promise<Float32Array>;
    getBaseWorldBlank(): Promise<Float32Array>;
    getBaseWorldWater(): Promise<Float32Array>;
    getEventCountries(event: HistoryEvent): Promise<Array<Country>>;
    getAllEvents(): Promise<Array<HistoryEvent>>;
}

export default IEventService;