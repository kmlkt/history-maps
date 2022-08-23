import Country from "../models/country";
import HistoryEvent from "../models/event";
import IView2d from "../presenter/view-2d";
import controls from "./controls";

class View2d implements IView2d{
    onHover: (x: number, y: number, country: Country) => void;
    onNothingHovered: () => void;
    private context: CanvasRenderingContext2D;
    private event: HistoryEvent;
    private countries: Country[];

    constructor(){
        this.context = controls.canvas2d.getContext('2d');
        controls.canvas2dImage.addEventListener('load', () => {
            this.context.clearRect(0, 0, controls.canvas2d.clientWidth, controls.canvas2d.clientHeight);
            this.context.drawImage(controls.canvas2dImage, 0, 0, controls.canvas2d.clientWidth, controls.canvas2d.clientHeight);
        });
        controls.canvas2d.addEventListener('mousemove', e => this.onMouseMove(e))
    }

    show(): void {
        controls.canvas2d.removeAttribute('hidden');
        controls.canvas2d.width = controls.canvas2d.clientWidth;
        controls.canvas2d.height = controls.canvas2d.clientHeight;
    }

    setEvent(event: HistoryEvent, countries: Country[], imageUrl: string): void {
        this.event = event;
        this.countries = countries;
        controls.canvas2dImage.src = imageUrl;
    }

    hide(): void {
        controls.canvas2d.setAttribute('hidden', '');
    }

    private onMouseMove(e: MouseEvent){
        if(this.context == undefined || this.countries == undefined){
            return;
        }
        const pixel = this.context.getImageData(e.x, e.y, 1, 1).data;
        const r = pixel[0];
        const g = pixel[1];
        const b = pixel[2];
        const country = this.countries.find(x => x.color.r === r && x.color.g === g && x.color.b === b);
        if(country != undefined && country != null && country.name != 'water'){
            this.onHover(e.x, e.y, country);
        }else{
            this.onNothingHovered();
        }
    }
}

export default View2d;