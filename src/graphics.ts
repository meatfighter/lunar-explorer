export enum Resolution {
    WIDTH = 320,
    HEIGHT = 200,
}

export enum PhysicalDimensions {
    WIDTH = 4,
    HEIGHT = 3,
}

enum Color {
    BLACK = 0,
    BLUE = 1,
    GREEN = 2,
    CYAN = 3,
    RED = 4,
    MAGENTA = 5,
    BROWN = 6,
    LIGHT_GRAY = 7,
    GRAY = 8,
    LIGHT_BLUE = 9,
    LIGHT_GREEN = 10,
    LIGHT_CYAN = 11,
    LIGHT_RED = 12,
    LIGHT_MAGENTA = 13,
    YELLOW = 14,
    WHITE = 15,
}

const rgbs = [
    0x000000,
    0x0000AA,
    0x00AA00,
    0x00AAAA,
    0xAA0000,
    0xAA00AA,
    0xAA5500,
    0xAAAAAA,
    0x555555,
    0x5555FF,
    0x55FF55,
    0x55FFFF,
    0xFF5555,
    0xFF55FF,
    0xFFFF55,
    0xFFFFFF,
];

function toColor(pal: number) {
    return new Uint8ClampedArray([ pal >>> 16, 0xFF & (pal >>> 8), 0xFF & pal, 0xFF ]);
}

const palette: Uint8ClampedArray[] = new Array(rgbs.length).fill(null).map((_, i) => toColor(rgbs[i]));

const buffer: number[] = new Array(Resolution.WIDTH * Resolution.HEIGHT).fill(Color.BLACK);
let penX = 0;
let penY = 0;

export function pset(x: number, y: number, color: number) {
    if (x >= 0 && y >= 0 && x < Resolution.WIDTH && y < Resolution.HEIGHT) {
        buffer[Resolution.WIDTH * y + x] = color;
    }
}

export function line(x0: number, y0: number, x1: number, y1: number, color: number): void;
export function line(x1: number, y1: number, color: number): void;
export function line(_x0: number, _y0: number, _x1: number, _y1?: number, _color?: number): void {

    let x0;
    let y0;
    let x1;
    let y1;
    let color;

    if (_y1 === undefined || _color === undefined) {
        x0 = penX;
        y0 = penY;
        x1 = _x0;
        y1 = _y0;
        color = _x1;
    } else {
        x0 = _x0;
        y0 = _y0;
        x1 = _x1;
        y1 = _y1;
        color = _color;
    }

    penX = x1;
    penY = y1;

    const dx = Math.abs(x1 - x0);
    const sx = (x0 < x1) ? 1 : -1;
    const dy = -Math.abs(y1 - y0);
    const sy = (y0 < y1) ? 1 : -1;
    let error = dx + dy;

    while (true) {
        pset(x0, y0, color);
        if (x0 === x1 && y0 === y1) {
            break;
        }
        const e2 = 2 * error;
        if (e2 >= dy) {
            if (x0 === x1) {
                break;
            }
            error += dy;
            x0 += sx;
        }
        if (e2 <= dx) {
            if (y0 === y1) {
                break;
            }
            error += dx;
            y0 += sy;
        }
    }
}

class PaintStackElement {
    constructor(public x1: number, public x2: number, public y: number, public dy: number) {
    }
}

function isInside(x: number, y: number, boundary: number) {
    return x >= 0 && y >= 0 && x < Resolution.WIDTH && y < Resolution.HEIGHT
            && buffer[Resolution.WIDTH * y + x] !== boundary;
}

export function paint(x: number, y: number, color: number, boundary: number = color) {
    if (!isInside(x, y, boundary)) {
        return;
    }
    const stack: PaintStackElement[] = [];
    stack.push(new PaintStackElement(x, x, y, 1));
    stack.push(new PaintStackElement(x, x, y - 1, -1));
    while (stack.length > 0) {
        const e = stack.pop() as PaintStackElement;
        let x1 = x = e.x1;
        let x2 = e.x2;
        let dy = e.dy;
        y = e.y;
        if (isInside(x, y, boundary)) {
            while (isInside(x - 1, y, boundary)) {
                pset(x - 1, y, color);
                --x;
            }
            if (x < x1) {
                stack.push(new PaintStackElement(x, x1 - 1, y - dy, -dy));
            }
        }
        while (x1 <= x2) {
            while (isInside(x1, y, boundary)) {
                pset(x1, y, color);
                ++x1;
            }
            if (x1 > x) {
                stack.push(new PaintStackElement(x, x1 - 1, y + dy, dy));
            }
            if (x1 - 1 > x2) {
                stack.push(new PaintStackElement(x2 + 1, x1 - 1, y - dy, -dy));
            }
            ++x1;
            while (x1 < x2 && !isInside(x1, y, boundary)) {
                ++x1;
            }
            x = x1;
        }
    }
}