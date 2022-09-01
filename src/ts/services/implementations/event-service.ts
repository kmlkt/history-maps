import { DATA_URL } from "../../constants/constants";
import Country from "../../models/country";
import HistoryEvent from "../../models/event";
import IEventService from "../abstractions/event-service";

class EventService implements IEventService{
    async getEventBitmapUrl(event: HistoryEvent): Promise<string> {
        return `${DATA_URL}/${event.worldId}.bmp`;
    }
    async getCountryPoints(event: HistoryEvent, country: Country): Promise<Float32Array> {
        const response = await fetch(`${DATA_URL}/${event.worldId}/${country.name}/points.bin`);
        const blob = await response.blob();
        return new Float32Array(await blob.arrayBuffer());
    }
    async getBaseWorldBlank(): Promise<Float32Array> {
        const response = await fetch(`${DATA_URL}/baseworld/blank/points.bin`);
        const blob = await response.blob();
        return new Float32Array(await blob.arrayBuffer());
    }
    async getBaseWorldWater(): Promise<Float32Array> {
        const response = await fetch(`${DATA_URL}/baseworld/water/points.bin`);
        const blob = await response.blob();
        return new Float32Array(await blob.arrayBuffer());
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