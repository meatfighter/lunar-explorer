import { startAnimation, stopAnimation } from "./animate";
import { cls, convertBufferToImage, draw, PhysicalDimensions, Resolution } from "./graphics";



let canvas: HTMLCanvasElement | null;
let ctx: CanvasRenderingContext2D | null;

export async function enter() {
    const mainElement = document.getElementById("main-content") as HTMLElement;
    mainElement.innerHTML = `<canvas id="lunar-canvas" class="canvas" width="${Resolution.WIDTH}" 
            height="${Resolution.HEIGHT}"></canvas>`;
    canvas = document.getElementById("lunar-canvas") as HTMLCanvasElement | null;
    if (!canvas) {
        return;
    }
    windowResized();


    cls();
    draw('BM0,6C12R16L1H1L12D2C4R12L1G1L8BL1BU4C11R10H1L8U1R8H1L6R1E1R2D1C15R1D1R1D1BD1BL3C3L3U1F1U1E1');

    const g = ctx as CanvasRenderingContext2D;
    g.drawImage(await convertBufferToImage(), 0, 0);
}

export function update() {

}

export function render() {
    if (!ctx) {
        windowResized();
        return;
    }


}

export function windowResized() {

    ctx = null;
    canvas = document.getElementById("lunar-canvas") as HTMLCanvasElement | null;
    if (!canvas) {
        return;
    }
    canvas.style.display = 'none';

    const innerWidth = window.innerWidth;
    const innerHeight = window.innerHeight;

    let styleWidth: number;
    let styleHeight: number;
    const transform = new DOMMatrix();

    if (innerWidth >= innerHeight) {
        canvas.width = Resolution.WIDTH;
        canvas.height = Resolution.HEIGHT;

        styleWidth = innerWidth;
        styleHeight = styleWidth * PhysicalDimensions.HEIGHT / PhysicalDimensions.WIDTH;
        if (innerHeight < styleHeight) {
            styleHeight = innerHeight;
            styleWidth = styleHeight * PhysicalDimensions.WIDTH / PhysicalDimensions.HEIGHT;
        }
    } else {
        canvas.width = Resolution.HEIGHT as number;
        canvas.height = Resolution.WIDTH as number;

        styleHeight = innerHeight;
        styleWidth = styleHeight * PhysicalDimensions.HEIGHT / PhysicalDimensions.WIDTH;
        if (innerWidth < styleWidth) {
            styleWidth = innerWidth;
            styleHeight = styleWidth * PhysicalDimensions.WIDTH / PhysicalDimensions.HEIGHT;
        }

        transform.a = transform.d = transform.e = 0;
        transform.b = -1;
        transform.c = 1;
        transform.f = Resolution.WIDTH;
    }

    canvas.style.display = 'block';
    canvas.style.width = `${Math.floor(styleWidth)}px`;
    canvas.style.height = `${Math.floor(styleHeight)}px`;
    canvas.style.left = `${Math.floor((innerWidth - styleWidth) / 2)}px`
    canvas.style.top = `${Math.floor((innerHeight - styleHeight) / 2)}px`;

    ctx = canvas.getContext('2d');
    if (!ctx) {
        return;
    }
    ctx.setTransform(transform);

    render();
}