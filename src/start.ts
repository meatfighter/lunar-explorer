let volume = 10;
let landscape = false;

export function enter() {
    window.addEventListener('resize', windowResized);
    window.addEventListener('touchmove', onTouchMove, { passive: false });

    const mainElement = document.getElementById('main-content') as HTMLElement;
    mainElement.innerHTML = `
            <div id="start-div">
                <div class="volume-div">
                    <span class="left-volume-label" id="left-volume-span" lang="en">&#x1F56A;</span>
                    <input type="range" id="volume-input" min="0" max="1" step="any" value="0.1">
                    <span class="right-volume-label" id="right-volume-span" lang="en">100</span>
                </div>
                <div id="go-div">
                    <button id="start-button">Start</button>
                </div>
            </div>`;

    const volumeInput = document.getElementById('volume-input') as HTMLInputElement;
    volumeInput.addEventListener('input', volumeChanged);

    windowResized();
}

export function exit() {
    window.removeEventListener('resize', windowResized);
    window.removeEventListener('touchmove', onTouchMove);

    const volumeInput = document.getElementById('volume-input') as HTMLInputElement;
    volumeInput.removeEventListener('input', volumeChanged);
}

function onTouchMove(e: TouchEvent) {
    let target = e.target as HTMLElement | null;
    while (target !== null) {
        if (target.id === 'volume-input') {
            if (landscape) {
                return;
            }

            const volumeInput = target as HTMLInputElement;
            const max = parseFloat(volumeInput.max);
            const min = parseFloat(volumeInput.min);
            const rect = volumeInput.getBoundingClientRect();
            const value = (1 - ((e.touches[0].clientY - rect.top) / rect.height)) * (max - min) + min;
            volumeInput.value = value.toString();
            volumeInput.dispatchEvent(new Event('input'));
            return;
        }
        target = target.parentElement;
    }
    e.preventDefault();
}

function volumeChanged() {
    const leftVolumeSpan = document.getElementById('left-volume-span') as HTMLSpanElement;
    const volumeInput = document.getElementById('volume-input') as HTMLInputElement;
    const rightVolumeSpan = document.getElementById('right-volume-span') as HTMLSpanElement;

    const value = (+volumeInput.value - +volumeInput.min) / (+volumeInput.max - +volumeInput.min) * 100;
    volumeInput.style.setProperty('--thumb-position', `${value}%`);

    if (value === 0) {
        volume = 0;
    } else if (value === 100) {
        volume = 100;
    } else if (value < 50) {
        volume = Math.ceil(value);
    } else {
        volume = Math.floor(value);
    }

    rightVolumeSpan.textContent = String(volume);
}

function windowResized() {
    const startDiv = document.getElementById('start-div') as HTMLDivElement;
    const leftVolumeSpan = document.getElementById('left-volume-span') as HTMLSpanElement;
    const rightVolumeSpan = document.getElementById('right-volume-span') as HTMLSpanElement;

    startDiv.style.top = startDiv.style.left = startDiv.style.transform = '';
    startDiv.style.display = 'none';

    const innerWidth = window.innerWidth;
    const innerHeight = window.innerHeight;
    landscape = (innerWidth >= innerHeight);
    startDiv.style.display = 'flex';

    rightVolumeSpan.style.width = '';
    rightVolumeSpan.style.display = 'inline-block';
    rightVolumeSpan.style.textAlign = 'center';
    rightVolumeSpan.textContent = '100';
    if (landscape) {
        const rightVolumeSpanWidth = rightVolumeSpan.getBoundingClientRect().width;
        rightVolumeSpan.style.width = `${rightVolumeSpanWidth}px`;

        const rect = startDiv.getBoundingClientRect();
        startDiv.style.left = `${(innerWidth - rect.width) / 2}px`
        startDiv.style.top = `${(innerHeight - rect.height) / 2}px`;
    } else {
        const rightVolumeSpanHeight = rightVolumeSpan.getBoundingClientRect().height;
        rightVolumeSpan.style.width = `${rightVolumeSpanHeight}px`;

        startDiv.style.transform = 'rotate(-90deg)';
        const rect = startDiv.getBoundingClientRect();
        startDiv.style.left = `${(innerWidth - rect.height) / 2}px`
        startDiv.style.top = `${(innerHeight - rect.width) / 2}px`;
    }
    rightVolumeSpan.textContent = String(volume);
}