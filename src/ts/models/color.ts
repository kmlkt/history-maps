class Color{
    r: number;
    g: number;
    b: number;

    constructor(r: (number | null) = null, g: (number | null) = null, b: (number | null) = null){
        if(r != null){
            this.r = r;
        }
        if(g != null){
            this.g = g;
        }
        if(b != null){
            this.b = b;
        }
    }
}

export default Color;