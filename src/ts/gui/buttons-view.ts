import IButtonsView from "../presenter/buttons-view";
import controls from "./controls";

class ButtonsView implements IButtonsView{
    onSwitchModeClicked: () => void;
    onPauseClicked: () => void;
    onSpeedClicked: () => void;
    onChangeYearClicked: () => void;

    constructor(){
        controls.switcher.addEventListener('click', () => this.onSwitchModeClicked());
        controls.pause.addEventListener('click', () => this.onPauseClicked());
        controls.showSpeedDialog.addEventListener('click', () => this.onSpeedClicked());
        controls.showYearDialog.addEventListener('click', () => this.onChangeYearClicked());
    }

    setPauseButtonText(paused: boolean): void {
        if(paused){
            controls.pause.textContent = '=';
        } else {
            controls.pause.textContent = '►';
        }
    }
}

export default ButtonsView;