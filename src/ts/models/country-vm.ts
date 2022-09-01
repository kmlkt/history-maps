import Color from "./color";

class CountryVm{
    name: string;
    color: Color;
    points: Float32Array;

    constructor(name: string, color: Color, points: Float32Array){
        this.name = name;
        this.color = color;
        this.points = points;
    }
}

export default CountryVm;