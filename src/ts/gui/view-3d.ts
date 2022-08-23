import Country from "../models/country";
import HistoryEvent from "../models/event";
import IView3d from "../presenter/view-3d";
import controls from "./controls";
import * as mat4 from '../libs/gl-matrix/mat4';

class View3d implements IView3d {
    onHover: (x: number, y: number, country: Country) => void;
    onNothingHovered: () => void;
    private gl: WebGLRenderingContext;
    private event: HistoryEvent;
    private countries: Country[];
    private positionBuffer: WebGLBuffer;
    private colorBuffer: WebGLBuffer;
    private projectionMatrix: WebGLUniformLocation;
    private modelViewMatrix: WebGLUniformLocation;
    private shaderProgram: WebGLProgram;
    private vertexPosition: number;
    private vertexColor: number;
    private  glStarted: boolean = false;
    private previousX: number = undefined;
    private previousY: number = undefined;
    private rotationZ: number = 0;
    private rotationY: number = 0;
    private mouseX: number = null;
    private mouseY: number = null;

    constructor() {
        controls.canvas3d.addEventListener('mousedown', e => this.mouseDown(e));
        controls.canvas3d.addEventListener('mousemove', e => this.mouseMove(e));
    }

    show(): void {
        controls.canvas3d.removeAttribute('hidden');
        controls.canvas3d.width = controls.canvas3d.clientWidth;
        controls.canvas3d.height = controls.canvas3d.clientHeight;
        this.gl = controls.canvas3d.getContext('webgl');
    }

    async setEvent(event: HistoryEvent, countries: Country[], points: Float64Array, colors: Float64Array): Promise<void> {
        if(!this.glStarted){
            await this.initGl();
            await this.runGl();
            this.glStarted = true;
        }

        this.event = event;
        this.countries = countries;
        await this.setGlData(points, colors);
    }

    hide(): void {
        throw new Error("Method not implemented.");
    }

    async initGl(){
        const shaderProgram = this.gl.createProgram();
        this.gl.attachShader(shaderProgram, await this.loadShader(this.gl.VERTEX_SHADER, './shaders/vertex.glsl'));
        this.gl.attachShader(shaderProgram, await this.loadShader(this.gl.FRAGMENT_SHADER, './shaders/fragment.glsl'));
        this.gl.linkProgram(shaderProgram);
        this.shaderProgram = shaderProgram;
        this.projectionMatrix = this.gl.getUniformLocation(this.shaderProgram, 'uProjectionMatrix');
        this.modelViewMatrix = this.gl.getUniformLocation(this.shaderProgram, 'uModelViewMatrix');
        this.vertexPosition = this.gl.getAttribLocation(this.shaderProgram, 'aVertexPosition');
        this.vertexColor = this.gl.getAttribLocation(this.shaderProgram, 'aVertexColor');
        this.gl.useProgram(shaderProgram);
    }

    async setGlData(points: Float64Array, colors: Float64Array) {
        //this.gl.linkProgram(this.shaderProgram);
        await this.initBuffers(points, colors);

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer);
        this.gl.vertexAttribPointer(this.vertexPosition, 3, this.gl.FLOAT, false, 0, 0);
        this.gl.enableVertexAttribArray(this.vertexPosition);

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.colorBuffer);
        this.gl.vertexAttribPointer(this.vertexColor, 3, this.gl.FLOAT, false, 0, 0);
        this.gl.enableVertexAttribArray(this.vertexColor);
    }

    async runGl(){
        function render(t: View3d) {
            t.drawScene();
    
            requestAnimationFrame(() => render(t));
        }
        requestAnimationFrame(() => render(this));
    }

    async drawScene() {

        //this.gl.linkProgram(this.shaderProgram);
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
        this.gl.clearDepth(1.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.depthFunc(this.gl.LEQUAL);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

        const fieldOfView = 45 * Math.PI / 180;   // in radians
        const aspect = this.gl.canvas.clientWidth / this.gl.canvas.clientHeight;
        const zNear = 0.1;
        const zFar = 1850.0;
        const projectionMatrix = mat4.create();
        mat4.perspective(projectionMatrix, fieldOfView, aspect, zNear, zFar);

        const modelViewMatrix = mat4.create();
        mat4.translate(modelViewMatrix, modelViewMatrix, [-0.0, 0.0, -1300.0]);
        mat4.rotate(modelViewMatrix, modelViewMatrix, -90 * Math.PI / 180, [0, 1, 0]);
        mat4.rotate(modelViewMatrix, modelViewMatrix, -90 * Math.PI / 180, [1, 0, 0]);
        mat4.rotate(modelViewMatrix, modelViewMatrix, this.rotationY, [0, 1, 0]);
        mat4.rotate(modelViewMatrix, modelViewMatrix, this.rotationZ, [0, 0, 1]);

        this.gl.uniformMatrix4fv(this.projectionMatrix, false, projectionMatrix);
        this.gl.uniformMatrix4fv(this.modelViewMatrix, false, modelViewMatrix);

        this.gl.drawArrays(this.gl.TRIANGLES, 0, 1752840);

        if(this.mouseX != null && this.mouseY != null){
            const length = 4;
            const pixel = new Uint8Array(length);
            this.gl.readPixels(this.mouseX, controls.canvas3d.clientHeight - this.mouseY, 1, 1, this.gl.RGBA, this.gl.UNSIGNED_BYTE, pixel);
            const r = pixel[0];
            const g = pixel[1];
            const b = pixel[2];
            const country = this.countries.find(x => x.color.r === r && x.color.g === g && x.color.b === b);
            if(country != undefined && country != null && country.name != 'water'){
                this.onHover(this.mouseX, this.mouseY, country);
            }else{
                this.onNothingHovered();
            }

            this.mouseX = null;
            this.mouseY = null;
        }
    }

    private async initBuffers(points: Float64Array, colors: Float64Array) {
        const positionBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, positionBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, points, this.gl.STATIC_DRAW);

        const colorBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, colorBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, colors, this.gl.STATIC_DRAW);

        this.positionBuffer = positionBuffer;
        this.colorBuffer = colorBuffer;
    }

    private async initProgram() {
    }

    private async loadShader(type: number, path: string) {
        const r = await fetch(path);
        const source = await r.text();
        const shader = this.gl.createShader(type);
        this.gl.shaderSource(shader, source);
        this.gl.compileShader(shader);
        return shader;
    }

    private mouseMove(e: MouseEvent) {
        const x = this.xToRelative(e.clientX);
        const y = this.yToRelative(e.clientY);
        if(this.previousX != undefined && this.previousY != undefined && e.buttons != 0){
            this.rotationZ += (x - this.previousX) / 150;
            this.rotationY += (y - this.previousY) / 150;
            this.previousX = x;
            this.previousY = y;
        }

        // if(this.countries == undefined){
        //     return;
        // }
  
        //pixel.forEach(x => {if(x != 0) {throw new Error('jdfshfai')}});
        this.mouseX = e.x;
        this.mouseY = e.y;
       
    }

    private mouseDown(e: MouseEvent){
        this.previousX = this.xToRelative(e.clientX);
        this.previousY = this.yToRelative(e.clientY);
    }

    private xToRelative(x: number): number{
        return x - controls.canvas3d.getBoundingClientRect().x;
    }

    private yToRelative(y: number): number{
        return y - controls.canvas3d.getBoundingClientRect().y;
    }
}

export default View3d;