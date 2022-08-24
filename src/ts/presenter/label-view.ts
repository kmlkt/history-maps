import Country from "../models/country";

interface ILabelView{
    showLabel(x: number, y: number, country: Country): void;
    hideLabel(): void;
}

export default ILabelView;