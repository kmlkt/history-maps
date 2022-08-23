import Country from "../models/country";
import ILabelView from "../presenter/label-view";
import controls from "./controls";

class LabelView implements ILabelView{
    showLabel(x: number, y: number, country: Country): void {
        controls.countryName.removeAttribute('hidden');
        controls.countryName.style.left = x.toString() + 'px';
        controls.countryName.style.top = y.toString() + 'px';
        controls.countryName.textContent = country.name;
    }

    hideLabel(): void{
        controls.countryName.setAttribute('hidden', '');
    }
}

export default LabelView;