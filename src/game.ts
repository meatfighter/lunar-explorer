import { startAnimation, stopAnimation } from "./animate";

enum Display {
    WIDTH = 320,
    HEIGHT = 200,
}

let canvas: HTMLCanvasElement | null;
let ctx: CanvasRenderingContext2D | null;

export function enter() {
    const mainElement = document.getElementById("main-content") as HTMLElement;
    mainElement.innerHTML = `<canvas id="lunar-canvas" class="canvas" width="${Display.WIDTH}" 
            height="${Display.HEIGHT}"></canvas>`;
    canvas = document.getElementById("lunar-canvas") as HTMLCanvasElement | null;
    if (!canvas) {
        return;
    }
    windowResized();
}

export function update() {

}

export function render() {
    if (!ctx) {
        windowResized();
        return;
    }

    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, Display.WIDTH, Display.HEIGHT);

    ctx.strokeStyle = '#FF0000';
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(10, 10);
    ctx.stroke();
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
        canvas.width = Display.WIDTH;
        canvas.height = Display.HEIGHT;

        styleWidth = innerWidth;
        styleHeight = styleWidth * Display.HEIGHT / Display.WIDTH;
        if (innerHeight < styleHeight) {
            styleHeight = innerHeight;
            styleWidth = styleHeight * Display.WIDTH / Display.HEIGHT;
        }
    } else {
        canvas.width = Display.HEIGHT as number;
        canvas.height = Display.WIDTH as number;

        styleWidth = innerHeight as number;
        styleHeight = styleWidth * Display.HEIGHT / Display.WIDTH;
        if (innerWidth < styleHeight) {
            styleHeight = innerWidth as number;
            styleWidth = styleHeight * Display.WIDTH / Display.HEIGHT;
        }

        transform.a = transform.d = transform.e = 0;
        transform.b = -1;
        transform.c = 1;
        transform.f = Display.WIDTH;
    }

    console.log(`${styleWidth} ${styleHeight}`);

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