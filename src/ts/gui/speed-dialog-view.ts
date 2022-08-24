import ISpeedDialogView from "../presenter/speed-dialog-view";
import controls from "./controls";

class SpeedDialogView implements ISpeedDialogView{
    onCancelClicked: () => void;
    onOkClicked: (speed: number) => void;

    constructor(){
        controls.speedDialogPlus.addEventListener('click', () => {
            const current = parseInt(controls.speedDialogValue.textContent);
            if(current < 10){
                controls.speedDialogValue.textContent = (current + 1).toString();
            }
        });
        controls.speedDialogMinus.addEventListener('click', () => {
            const current = parseInt(controls.speedDialogValue.textContent);
            if(current > 1){
                controls.speedDialogValue.textContent = (current - 1).toString();
            }
        });
        controls.speedDialogOk.addEventListener('click', () => {
            controls.speedDialog.setAttribute('hidden', '');
            this.onOkClicked(parseInt(controls.speedDialogValue.textContent));
        });
        controls.speedDialogCancel.addEventListener('click', () => {
            controls.speedDialog.setAttribute('hidden', '');
            this.onCancelClicked();
        });
    }

    show(currentSpeed: number): void {
        controls.speedDialog.removeAttribute('hidden');
        controls.speedDialogValue.textContent = currentSpeed.toString();
    }
}

export default SpeedDialogView;