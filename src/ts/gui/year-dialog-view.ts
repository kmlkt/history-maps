import IYearDialogView from "../presenter/year-dialog-view";
import controls from "./controls";

class YearDialogView implements IYearDialogView{
    onCancelClicked: () => void;
    onOkClicked: (year: number) => void;

    constructor(){
        controls.yearDialogOk.addEventListener('click', () => {
            controls.yearDialog.setAttribute('hidden', '');
            this.onOkClicked(parseInt(controls.yearDialogInput.value));
        });

        controls.yearDialogCancel.addEventListener('click', () => {
            controls.yearDialog.setAttribute('hidden', '');
            this.onCancelClicked();
        });
    }

    show(currentYear: number): void {
        controls.yearDialog.removeAttribute('hidden');
        controls.yearDialogInput.value = currentYear.toString();
    }
}

export default YearDialogView;