export enum Resolution {
    WIDTH = 320,
    HEIGHT = 200,
}

export enum PhysicalDimensions {
    WIDTH = 4,
    HEIGHT = 3,
}

export enum PixelDimensions {
    WIDTH = PhysicalDimensions.WIDTH / Resolution.WIDTH,
    HEIGHT = PhysicalDimensions.HEIGHT / Resolution.HEIGHT,
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

const RGB = [
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

const palette: Uint8ClampedArray[] = new Array(RGB.length).fill(null).map((_, i) => toColor(RGB[i]));

const buffer: number[] = new Array(Resolution.WIDTH * Resolution.HEIGHT).fill(Color.BLACK);
let penX = 0;
let penY = 0;

export function cls() {
    buffer.fill(Color.BLACK);
}

enum DrawTokenType {
    STRING,
    NUMBER,
}

class DrawToken {

    type: DrawTokenType;
    value: String | number;
    index: number;

    constructor(type: DrawTokenType, value: string, index: number) {
        this.type = type;
        this.value = (type === DrawTokenType.NUMBER) ? parseInt(value) : value;
        this.index = index;
    }
}

function lexDrawString(str: string) {
    str = str.toUpperCase();

    let tokens: DrawToken[] = [];
    let type: DrawTokenType | null = null;
    let value = '';
    let index = 0;

    for (let i = 0; i <= str.length; ++i) {
        const c = (i < str.length) ? str.charAt(i) : '\0';
        if (c >= 'A' && c <= 'Z') {
            if (type !== DrawTokenType.STRING) {
                if (type !== null) {
                    tokens.push(new DrawToken(type, value, index));
                }
                type = DrawTokenType.STRING;
                value = '';
                index = i;
            }
            value += c;
        } else if (c >= '0' && c <= '9') {
            if (type !== DrawTokenType.NUMBER) {
                if (type !== null) {
                    tokens.push(new DrawToken(type, value, index));
                }
                type = DrawTokenType.NUMBER;
                value = '';
                index = i;
            }
            value += c;
        } else {
            if (type !== null) {
                tokens.push(new DrawToken(type, value, index));
            }
            type = null;
            value = '';
        }
    }

    return tokens;
}

export function draw(str: string) {
    const tokens = lexDrawString(str);

    let cursorX = 0;
    let cursorY = 0;
    let i = 0;
    let color = 0;

    while (i < tokens.length) {
        const commandToken = tokens[i++];
        if (commandToken.type !== DrawTokenType.STRING) {
            throw new Error(`<${commandToken.index}> Expected string: ${commandToken.value}`);
        }
        const commandStr = commandToken.value as string;
        let prefix: string | null;
        let command: string;
        if (commandStr.length > 2) {
            throw new Error(`<${commandToken.index}> String too long: ${commandToken.value}`);
        } else if (commandStr.length === 2) {
            prefix = commandStr.charAt(0);
            command = commandStr.charAt(1);
        } else {
            prefix = null;
            command = commandStr.charAt(0);
        }

        if (i >= tokens.length) {
            throw new Error('Expected number, but reached end of string.');
        }
        const valueToken = tokens[i++];
        if (valueToken.type !== DrawTokenType.NUMBER) {
            throw new Error(`<${valueToken.index}> Expected number: ${valueToken.value}`);
        }
        const value = valueToken.value as number;

        let targetX = cursorX;
        let targetY = cursorY;
        switch (command) {
            case 'C':
                color = value;
                continue;

            case 'U':
                targetY -= value;
                break;
            case 'D':
                targetY += value;
                break;
            case 'L':
                targetX -= value;
                break;
            case 'R':
                targetX += value;
                break;

            case 'E':
                targetX += value;
                targetY -= value;
                break;
            case 'F':
                targetX += value;
                targetY += value;
                break;
            case 'G':
                targetX -= value;
                targetY += value;
                break;
            case 'H':
                targetX -= value;
                targetY -= value;
                break;

            case 'M': {
                if (i >= tokens.length) {
                    throw new Error('Expected number, but reached end of string.');
                }
                const valueToken2 = tokens[i++];
                if (valueToken2.type !== DrawTokenType.NUMBER) {
                    throw new Error(`<${valueToken2.index}> Expected number: ${valueToken2.value}`);
                }
                targetX = value;
                targetY = valueToken2.value as number;
                break;
            }

            default:
                throw new Error(`<${commandToken.index}> Unknown command: ${command}`);
        }

        if (prefix === null) {
            line(cursorX, cursorY, targetX, targetY, color);
            cursorX = targetX;
            cursorY = targetY;
        } else if (prefix === 'B') {
            cursorX = targetX;
            cursorY = targetY;
        } else if (prefix === 'N') {
            line(cursorX, cursorY, targetX, targetY, color);
        } else {
            throw new Error(`<${commandToken.index}> Invalid prefix: ${commandToken.value}`);
        }
    }
}

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