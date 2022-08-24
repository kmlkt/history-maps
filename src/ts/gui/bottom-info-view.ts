import IBottomInfoView from "../presenter/bottom-info-view";
import controls from "./controls";

class BottomInfoView implements IBottomInfoView{
    onClose: () => void;

    constructor(){
        controls.closeBottomInfo.addEventListener('click', () => {
            controls.bottomInfo.remove();
            this.onClose();
        });
    }

    init(show: boolean): void {
        if(!show){
            controls.bottomInfo.remove();
        }
    }
}

export default BottomInfoView;