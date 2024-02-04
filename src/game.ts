import { startAnimation, stopAnimation } from "./animate";
import {cls, convertBufferToImage, draw, line, paint, PhysicalDimensions, Resolution} from "./graphics";



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


    let RM = 1;
    let XB = 40;

    cls();
    draw('BM0,6C12R16L1H1L12D2C4R12L1G1L8BL1BU4C11R10H1L8U1R8H1L6R1E1R2D1C15R1D1R1D1BD1BL3C3L3U1F1U1E1');

    // cls();
    // line(0, 0, 60, 20, 6);
    //
    // const data = [ 260, 20, 290, 90, 320, 90, 320, 110, 290, 110, 270, 180, 70, 180, 0, 199 ];
    // for (let i = 0; i < data.length; i += 2) {
    //     line(data[i], data[i + 1], 6);
    // }
    // paint(160, 10, 6, 6);
    // paint(160, 190, 6, 6);
    // for (let x = 60; x <= 240; x += 20) {
    //     let z = Math.floor(Math.random() * 43 + 1) + XB;
    //     line(x, 20, x + 10, z, 6);
    //     line(x + 20, 20, 6);
    //     paint(x + 10, 22, 6, 6);
    //     z = Math.floor(Math.random() * 50 + 1) + 100;
    //     line(x + 10, 180, x + 20, z, 6);
    //     line(x + 30, 180, 6);
    //     paint(x + 20, 178, 6, 6);
    // }

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