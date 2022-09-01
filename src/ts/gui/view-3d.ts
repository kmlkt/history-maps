import HistoryEvent from "../models/event";
import IView3d from "../presenter/view-3d";
import controls from "./controls";
import * as mat4 from '../libs/gl-matrix/mat4';
import CountryVm from "../models/country-vm";
import Color from "../models/color";
import sleep from "../common/sleep";

class View3d implements IView3d {
    onHover: (x: number, y: number, country: CountryVm) => void;
    onNothingHovered: () => void;
    private gl: WebGLRenderingContext;
    private event: HistoryEvent;
    private countries: CountryVm[] = [];
    private staticBuffers: BufferData[] = [];
    private mutableBuffers: BufferData[] = [];
    private projectionMatrix: WebGLUniformLocation;
    private modelViewMatrix: WebGLUniformLocation;
    private shaderProgram: WebGLProgram;
    private vertexPosition: number;
    private vertexColor: WebGLUniformLocation;
    private glStarted: boolean = false;
    private previousX: number = undefined;
    private previousY: number = undefined;
    private rotationZ: number = 0;
    private rotationY: number = 0;
    private mouseX: number = null;
    private mouseY: number = null;
    private hidden: boolean = true;

    constructor() {
        controls.canvas3d.addEventListener('mousedown', e => this.mouseDown(e));
        controls.canvas3d.addEventListener('mousemove', e => this.mouseMove(e));
    }

    show(): void {
        this.hidden = false;
        controls.canvas3d.removeAttribute('hidden');
        controls.canvas3d.width = controls.canvas3d.clientWidth;
        controls.canvas3d.height = controls.canvas3d.clientHeight;
        this.gl = controls.canvas3d.getContext('webgl');
    }

    async setBaseWorld(blank: CountryVm, water: CountryVm): Promise<void> {
        if (!this.glStarted) {
            await this.initGl();
            await this.runGl();
            this.glStarted = true;
        }

        var newBuffers: BufferData[] = [];
        newBuffers.push(this.createBuffer(blank.points, blank.color));
        newBuffers.push(this.createBuffer(water.points, water.color));
        this.staticBuffers = newBuffers;
    }

    setEvent(event: HistoryEvent, countries: CountryVm[]): void {
        this.event = event;
        this.countries = countries;
        this.updateGlData();
    }

    hide(): void {
        this.hidden = true;
        controls.canvas3d.setAttribute('hidden', '');
    }

    async initGl() {
        const shaderProgram = this.gl.createProgram();
        this.gl.attachShader(shaderProgram, await this.loadShader(this.gl.VERTEX_SHADER, './shaders/vertex.glsl'));
        this.gl.attachShader(shaderProgram, await this.loadShader(this.gl.FRAGMENT_SHADER, './shaders/fragment.glsl'));
        this.gl.linkProgram(shaderProgram);
        this.shaderProgram = shaderProgram;
        this.projectionMatrix = this.gl.getUniformLocation(this.shaderProgram, 'uProjectionMatrix');
        this.modelViewMatrix = this.gl.getUniformLocation(this.shaderProgram, 'uModelViewMatrix');
        this.vertexColor = this.gl.getUniformLocation(this.shaderProgram, 'uVertexColor');
        this.vertexPosition = this.gl.getAttribLocation(this.shaderProgram, 'aVertexPosition');
    }

    private updateGlData() {
        console.log('started');
        const newBuffers = this.countries.map(x => this.createBuffer(x.points, x.color));
        this.mutableBuffers = newBuffers;
        console.log('finished', this.mutableBuffers);
    }

    async runGl() {
        function render(t: View3d) {
            t.drawScene();

            requestAnimationFrame(() => render(t));
        }
        requestAnimationFrame(() => render(this));
    }

    async drawScene() {
        if (!this.hidden) {
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



            this.staticBuffers.forEach(d => this.drawBuffer(d, projectionMatrix, modelViewMatrix));
            this.mutableBuffers.forEach(d => this.drawBuffer(d, projectionMatrix, modelViewMatrix));

            if (this.mouseX != null && this.mouseY != null) {
                const length = 4;
                const pixel = new Uint8Array(length);
                this.gl.readPixels(this.mouseX, controls.canvas3d.clientHeight - this.mouseY, 1, 1, this.gl.RGBA, this.gl.UNSIGNED_BYTE, pixel);
                const r = pixel[0];
                const g = pixel[1];
                const b = pixel[2];
                const country = this.countries.find(x => x.color.r === r && x.color.g === g && x.color.b === b);
                if (country != undefined && country != null && country.name != 'water') {
                    this.onHover(this.mouseX, this.mouseY, country);
                } else {
                    this.onNothingHovered();
                }

                this.mouseX = null;
                this.mouseY = null;
            }
        }
    }

    private async drawBuffer(data: BufferData, pm: Iterable<number>, mvm: Iterable<number>) {
        this.gl.useProgram(this.shaderProgram);
        this.gl.uniformMatrix4fv(this.projectionMatrix, false, pm);
        this.gl.uniformMatrix4fv(this.modelViewMatrix, false, mvm);
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, data.buffer);
        this.gl.vertexAttribPointer(this.vertexPosition, 3, this.gl.FLOAT, false, 0, 0);
        this.gl.enableVertexAttribArray(this.vertexPosition);
        const r = data.color.r / 255.0;
        const g = data.color.g / 255.0;
        const b = data.color.b / 255.0;
        this.gl.uniform4f(this.vertexColor, r, g, b, 1.0);

        this.gl.drawArrays(this.gl.TRIANGLES, 0, data.count);
    }

    private createBuffer(points: Float32Array, color: Color): BufferData {
        const positionBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, positionBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, points, this.gl.STATIC_DRAW);
        return new BufferData(positionBuffer, color, points.length / 3);
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
        if (this.previousX != undefined && this.previousY != undefined && e.buttons != 0) {
            this.rotationZ += (x - this.previousX) / 150;
            this.rotationY += (y - this.previousY) / 150;
            this.previousX = x;
            this.previousY = y;
        }

        this.mouseX = e.x;
        this.mouseY = e.y;
    }

    private mouseDown(e: MouseEvent) {
        this.previousX = this.xToRelative(e.clientX);
        this.previousY = this.yToRelative(e.clientY);
    }

    private xToRelative(x: number): number {
        return x - controls.canvas3d.getBoundingClientRect().x;
    }

    private yToRelative(y: number): number {
        return y - controls.canvas3d.getBoundingClientRect().y;
    }
}

class BufferData {
    buffer: WebGLBuffer;
    color: Color;
    count: number;

    constructor(buffer: WebGLBuffer, color: Color, count: number) {
        this.buffer = buffer;
        this.color = color;
        this.count = count;
    }
}

export default View3d;