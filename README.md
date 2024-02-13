Project page: https://meatfighter.com/lunar-explorer

```typescript
cls();
draw('BM0,6C12R16L1H1L1<wbr>2D2C4R12L1G1L8BL1BU4C<wbr>11R10H1L8U1R8H1L6R1E1R2<wbr>D1C15R1D1R1D1BD1BL3C3L<wbr>3U1F1U1E1');
get(0, 0, 16, 8).then(...);

...

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

...

if (tapPressed) {
    tapPressed = false;
    --shipVy;
    playSoundEffect('sfx/boost.mp3');
} else {
    shipVy += 0.4;
}
shipX++;
shipY += shipVy;

if (point(shipX + 17, shipY + 6) === Color.BROWN
        || point(shipX + 9, shipY - 1) === Color.BROWN
        || point(shipX + 8, shipY + 9) === Color.BROWN) {
    locate(10, 15);
    print('GAME OVER');
    playSoundEffect('sfx/crash.mp3');
    ...
} else if (shipX >= 303) {
    ++level;
    minStalactiteHeight += 2;
    playSoundEffect('sfx/success.mp3');
    ...
}
```

```
10  RANDOMIZE TIMER
20  CLEAR ,,,32768!
```