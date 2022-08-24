import Country from "../models/country";
import HistoryEvent from "../models/event";

interface IView2d{
    onHover: (x: number, y: number, country: Country) => void;
    onNothingHovered: () => void;
    show(): void;
    setEvent(event: HistoryEvent, countries: Country[], imageUrl: string): void;
    hide(): void;
}

export default IView2d;