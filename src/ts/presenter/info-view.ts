import HistoryEvent from "../models/event";

interface IInfoView{
    addEvent(event: HistoryEvent): void;
    removeEvent(event: HistoryEvent): void;
    setYear(year: number): void;
    clearAllEvents(): void;
}

export default IInfoView;