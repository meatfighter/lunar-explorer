import { startAnimation, stopAnimation } from "./animate";
import {
    cls,
    Color,
    convertBufferToImage,
    draw,
    get,
    line,
    locate,
    paint,
    PhysicalDimensions,
    point,
    print,
    Resolution
} from "./buffer-graphics";
import { acquireWakeLock, releaseWakeLock } from "./wake-lock";
import { NoParamVoidFunc } from "./no-param-void-func";

enum State {
    GAME_START,
    LEVEL_START,
    WAITING_FOR_BUFFER_TO_IMAGE,
    PLAYING,
    GAME_OVER,
}

let canvas: HTMLCanvasElement | null;
let ctx: CanvasRenderingContext2D | null;

let shipImage: ImageBitmap;
let caveImage: ImageBitmap | null;

let removeMediaEventListener: NoParamVoidFunc | null = null;
let exiting = false;

const keysPressed: Set<string> = new Set();
const touchPressed: Set<number> = new Set();
const mouseButtonsPressed: Set<number> = new Set();

const caveXYs = [ 260, 20, 290, 90, 320, 90, 320, 110, 290, 110, 270, 180, 70, 180, 0, 199 ];

let state = State.GAME_START;
let level = 0;
let minStalactiteHeight = 0;
let shipX = 0;
let shipY = 0;
let shipYA = 0;
let tapPressed = false;

const updatePixelRatio = () => {
    if (removeMediaEventListener !== null) {
        removeMediaEventListener();
        removeMediaEventListener = null;
    }

    if (exiting) {
        return;
    }

    const media = matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`);
    media.addEventListener("change", updatePixelRatio);
    removeMediaEventListener = () => media.removeEventListener("change", updatePixelRatio);

    windowResized();
};

export async function init() {
    cls();
    draw('BM0,6C12R16L1H1L12D2C4R12L1G1L8BL1BU4C11R10H1L8U1R8H1L6R1E1R2D1C15R1D1R1D1BD1BL3C3L3U1F1U1E1');
    shipImage = await get(0, 0, 16, 8);

    // TODO REMOVE THIS
    // const response = await fetch('ascii.png');
    // const blob = await response.blob();
    // const asciiImage = await createImageBitmap(blob);
    // const data = await readImageBitmapPixels(asciiImage);
    // if (!data) {
    //     return;
    // }
    //
    // let str = '';
    // for (let i = 0; i < 64; ++i) {
    //     for (let y = 0; y < 8; ++y) {
    //         let s = 0;
    //         for (let x = 7; x >= 0; --x) {
    //             s <<= 1;
    //             if (data[4 * (512 * y + x + 8 * i)] !== 0) {
    //                 s |= 1;
    //             }
    //         }
    //         str += String.fromCharCode(s);
    //     }
    // }
    // console.log(btoa(str));
}

// TODO REMOVE THIS
// async function readImageBitmapPixels(imageBitmap: ImageBitmap) {
//     // Create a canvas element dynamically
//     const canvas = document.createElement('canvas');
//     canvas.width = imageBitmap.width;
//     canvas.height = imageBitmap.height;
//
//     // Get the 2D context of the canvas
//     const g = canvas.getContext('2d');
//     if (!g) {
//         return;
//     }
//
//     // Draw the ImageBitmap onto the canvas
//     g.drawImage(imageBitmap, 0, 0);
//
//     // Use getImageData to read the pixels of the entire canvas
//     const imageData = g.getImageData(0, 0, canvas.width, canvas.height);
//
//     // The imageData.data contains the pixel data (RGBA values)
//     // Now you can access or manipulate the pixel data
//     return imageData.data;
// }

export function enter() {
    exiting = false;

    window.addEventListener('resize', windowResized);
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    document.addEventListener('visibilitychange', onVisibilityChanged);
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);
    document.addEventListener('touchstart', onTouchStart, { passive: false });
    document.addEventListener('touchend', onTouchEnd);
    document.addEventListener('touchcancel', onTouchEnd);
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);

    acquireWakeLock();

    const mainElement = document.getElementById("main-content") as HTMLElement;
    mainElement.innerHTML = `<canvas id="lunar-canvas" class="canvas" width="${Resolution.WIDTH}" 
            height="${Resolution.HEIGHT}"></canvas>`;
    canvas = document.getElementById("lunar-canvas") as HTMLCanvasElement;

    updatePixelRatio();

    state = State.GAME_START;
    startAnimation();
}

export function exit() {
    exiting = true;
    window.removeEventListener('resize', windowResized);
    window.removeEventListener('touchmove', onTouchMove);
    document.removeEventListener('visibilitychange', onVisibilityChanged);
    document.removeEventListener('keydown', onKeyDown);
    document.removeEventListener('keyup', onKeyUp);
    document.removeEventListener('touchstart', onTouchStart);
    document.removeEventListener('touchend', onTouchEnd);
    document.removeEventListener('touchcancel', onTouchEnd);
    document.removeEventListener('mousedown', onMouseDown);
    document.removeEventListener('mouseup', onMouseUp);
    if (removeMediaEventListener !== null) {
        removeMediaEventListener();
        removeMediaEventListener = null;
    }
    keysPressed.clear();
    touchPressed.clear();
    mouseButtonsPressed.clear();
    releaseWakeLock();
}

function onTouchMove(e: TouchEvent) {
    e.preventDefault();
}

export function update() {
    switch (state) {
        case State.GAME_START:
            updateGameStart();
            break;
        case State.LEVEL_START:
            updateLevelStart();
            break;
        case State.PLAYING:
            updatePlaying();
            break;
        case State.GAME_OVER:
            updateGameOver();
            break;
    }
}

function updateGameStart() {
    level = 1;
    minStalactiteHeight = 40;
    updateLevelStart();
}

function updateLevelStart() {
    shipX = 1;
    shipY = 30;
    shipYA = 0;
    tapPressed = false;
    state = State.WAITING_FOR_BUFFER_TO_IMAGE;
    createCaveImage().then(() => state = State.PLAYING);
}

function updatePlaying() {
    if (tapPressed) {
        tapPressed = false;
        --shipYA;
    } else {
        shipYA += 0.4;
        // TODO PLAY SOUND EFFECT
    }
    shipX++;
    shipY += shipYA;

    if (point(shipX + 17, shipY + 6) === Color.BROWN
            || point(shipX + 9, shipY - 1) === Color.BROWN
            || point(shipX + 8, shipY + 9) === Color.BROWN) {
        locate(10, 15);
        print('GAME OVER');
        state = State.WAITING_FOR_BUFFER_TO_IMAGE;
        convertBufferToImage().then(image => {
            caveImage = image;
            state = State.GAME_OVER;
        });
        // TODO SOUND EFFECT
        // TODO RENDER GAME OVER
    } else if (shipX >= 303) {
        ++level;
        minStalactiteHeight += 2;
        updateLevelStart();
    }
}

function updateGameOver() {

}

export function render() {
    if (!ctx) {
        windowResized();
        return;
    }
    if (!caveImage) {
        return;
    }

    ctx.drawImage(caveImage, 0, 0);
    ctx.drawImage(shipImage, Math.floor(shipX), Math.floor(shipY));
}

async function createCaveImage() {
    cls();

    // Draw cave floor and ceiling.
    line(0, 0, 60, 20, 6);
    for (let i = 0; i < caveXYs.length; i += 2) {
        line(caveXYs[i], caveXYs[i + 1], Color.BROWN);
    }
    paint(160, 10, Color.BROWN, Color.BROWN);
    paint(160, 190, Color.BROWN, Color.BROWN);

    for (let x = 60; x <= 240; x += 20) {

        // Draw stalactite with random height based on the level.
        let y = Math.floor(Math.random() * 43 + 1) + minStalactiteHeight;
        line(x, 20, x + 10, y, Color.BROWN);
        line(x + 20, 20, Color.BROWN);
        paint(x + 10, 22, Color.BROWN, Color.BROWN);

        // Draw stalagmite with random height based on the level.
        y = Math.floor(Math.random() * 50 + 1) + 100;
        line(x + 10, 180, x + 20, y, Color.BROWN);
        line(x + 30, 180, Color.BROWN);
        paint(x + 20, 178, Color.BROWN, Color.BROWN);
    }

    locate(1, 10);
    print(`LEVEL ${level} `);

    caveImage = await convertBufferToImage();
}

function onTap() {
    if (state != State.PLAYING || keysPressed.size !== 0 || touchPressed.size !== 0 || mouseButtonsPressed.size !== 0) {
        return;
    }

    tapPressed = true;

    // TODO SOUND EFFECT
}

function onKeyDown(e: KeyboardEvent) {
    if (!exiting) {
        onTap();
        keysPressed.add(e.key);
    }
}

function onKeyUp(e: KeyboardEvent) {
    if (!exiting) {
        keysPressed.delete(e.key);
    }
}

function onTouchStart(e: TouchEvent) {
    if (!exiting) {
        onTap();
        for (const touch of Array.from(e.touches)) {
            touchPressed.add(touch.identifier);
        }
    }
    e.preventDefault();
}

function onTouchEnd(e: TouchEvent) {
    if (!exiting) {
        for (const touch of Array.from(e.changedTouches)) {
            touchPressed.delete(touch.identifier);
        }
    }
}

function onMouseDown(e: MouseEvent) {
    if (!exiting) {
        onTap();
        mouseButtonsPressed.add(e.button);
    }
}

function onMouseUp(e: MouseEvent) {
    if (!exiting) {
        mouseButtonsPressed.delete(e.button);
    }
}

function windowResized() {

    if (exiting) {
        return;
    }

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

function onVisibilityChanged() {
    if (!exiting && document.visibilityState === 'visible') {
        acquireWakeLock();
    }
}