import HistoryEvent from "../models/event";
import IView2d from "../presenter/view-2d";
import controls from "./controls";

class View2d implements IView2d{
    private context: CanvasRenderingContext2D;

    constructor(){
        this.context = controls.canvas2d.getContext('2d');
    }

    show(): void {
        controls.canvas2d.removeAttribute('hidden');
        controls.canvas2d.width = controls.canvas2d.clientWidth;
        controls.canvas2d.height = controls.canvas2d.clientHeight;
    }
    setEvent(event: HistoryEvent, imageUrl: string): void {
        controls.canvas2dImage.src = imageUrl;
        controls.canvas2dImage.addEventListener('load', () => {
            this.context.clearRect(0, 0, controls.canvas2d.clientWidth, controls.canvas2d.clientHeight);
            this.context.drawImage(controls.canvas2dImage, 0, 0, controls.canvas2d.clientWidth, controls.canvas2d.clientHeight);
        });
    }
    hide(): void {
        throw new Error("Method not implemented.");
    }

}

export default View2d;