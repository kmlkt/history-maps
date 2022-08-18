import HistoryEvent from "../models/event";
import IInfoView from "../presenter/info-view";
import controls from "./controls";

class InfoView implements IInfoView{
    addEvent(event: HistoryEvent): void {
        const element: Element = controls.eventName.cloneNode(true) as Element;
        if(event.endYear == null){
            element.textContent = event.name;
        } else{
            element.textContent = `${event.name} (${this.stringifyYear(event.year)} - ${this.stringifyYear(event.endYear)})`;
        }
        element.classList.add('event-name-copy');
        controls.eventPanel.appendChild(element);
    }

    removeEvent(event: HistoryEvent): void {
        let children: Element[] = Array.prototype.slice.call(controls.eventPanel.children);
        children.forEach(element => {
            if(element.textContent == event.name){
                controls.eventPanel.removeChild(element);
            }
        });
    }

    private stringifyYear(year: number, addG: boolean = false): string{
        if(year < 0){
            return (-year).toString() + (addG ? ' г' : '') + ' до н.э.'
        } else {
            return year.toString() + (addG ? ' г' : '');
        }
    }

    setYear(year: number): void{
        controls.eventYear.textContent = this.stringifyYear(year, true);
    }
}

export default InfoView;