import HistoryEvent from "../models/event";

interface IView2d{
    show(): void;
    setEvent(event: HistoryEvent, imageUrl: string): void;
    hide(): void;
}

export default IView2d;