import CountryVm from "../models/country-vm";
import HistoryEvent from "../models/event";

interface IView3d{
    onHover: (x: number, y: number, country: CountryVm) => void;
    onNothingHovered: () => void;
    show(): void;
    setBaseWorld(blank: CountryVm, water: CountryVm): Promise<void>;
    setEvent(event: HistoryEvent, countries: CountryVm[]): void;
    hide(): void;
}

export default IView3d;