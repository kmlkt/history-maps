import IYearDialogView from "../presenter/year-dialog-view";
import controls from "./controls";

class YearDialogView implements IYearDialogView{
    onCancelClicked: () => void;
    onOkClicked: (year: number) => void;
    private doNe = 'до н.э.';
    private ne = 'н.э.';

    constructor(){
        controls.yearDialogOk.addEventListener('click', () => {
            controls.yearDialog.setAttribute('hidden', '');
            this.onOkClicked(this.getValue());
        });

        controls.yearDialogCancel.addEventListener('click', () => {
            controls.yearDialog.setAttribute('hidden', '');
            this.onCancelClicked();
        });

        controls.yearDialogOurAge.addEventListener('click', () => {
            if(controls.yearDialogOurAge.textContent == this.ne){
                controls.yearDialogOurAge.textContent = this.doNe;
            } else {
                controls.yearDialogOurAge.textContent = this.ne;
            }
        });
    }

    show(currentYear: number): void {
        controls.yearDialog.removeAttribute('hidden');
        this.setValue(currentYear);
    }

    private getValue(): number{
        return parseInt(controls.yearDialogInput.value) * (controls.yearDialogOurAge.textContent == this.ne ? 1 : -1);
    }

    private setValue(value: number): void{
        controls.yearDialogInput.value = (value >= 0 ? value : -value).toString();
        controls.yearDialogOurAge.textContent = value >= 0 ? this.ne : this.doNe;
    }
}

export default YearDialogView;