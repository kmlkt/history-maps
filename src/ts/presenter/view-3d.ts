import Country from "../models/country";
import HistoryEvent from "../models/event";

interface IView3d{
    onHover: (x: number, y: number, country: Country) => void;
    onNothingHovered: () => void;
    show(): void;
    setEvent(event: HistoryEvent, countries: Country[], points: Float64Array, colors: Float64Array): Promise<void>;
    hide(): void;
}

export default IView3d;