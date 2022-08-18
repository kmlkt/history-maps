import { DATA_URL } from "../../constants/constants";
import Country from "../../models/country";
import HistoryEvent from "../../models/event";
import IEventService from "../abstractions/event-service";

class EventService implements IEventService{
    async getEventBitmapUrl(event: HistoryEvent): Promise<string> {
        return `${DATA_URL}/${event.worldId}.bmp`;
    }
    async getEventPoints(event: HistoryEvent): Promise<Float64Array> {
        const response = await fetch(`${DATA_URL}/${event.worldId}/points.bin`);
        const blob = await response.blob();
        return new Float64Array(await blob.arrayBuffer());
    }
    async getEventColors(event: HistoryEvent): Promise<Float64Array> {
        const response = await fetch(`${DATA_URL}/${event.worldId}/colors.bin`);
        const blob = await response.blob();
        return new Float64Array(await blob.arrayBuffer());
    }
    async getEventCountries(event: HistoryEvent): Promise<Country[]> {
        const response = await fetch(`${DATA_URL}/${event.worldId}.json`);
        const json = await response.json();
        return json as Country[];
    }
    async getAllEvents(): Promise<HistoryEvent[]> {
        const response = await fetch(`${DATA_URL}/events.json`);
        const json = await response.json();
        return json;
    }
}

export default EventService;