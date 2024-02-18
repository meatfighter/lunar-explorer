import JSZip from 'jszip';
import { download } from "./download";
import { decodeAudioData, waitForDecodes } from "./sfx";
import { enter as enterStart } from "./start";

let landscape = false;
let progressBar: HTMLProgressElement;

export function enter() {
    window.addEventListener('resize', windowResized);
    window.addEventListener('touchmove', onTouchMove, { passive: false });

    const mainElement = document.getElementById('main-content') as HTMLElement;
    mainElement.innerHTML = `
            <div id="progress-container">
                <div id="progress-div">
                    <progress id="loading-progress" value="0" max="100"></progress>
                </div>
            </div>`;

    windowResized();

    progressBar = document.getElementById('loading-progress') as HTMLProgressElement;
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.addEventListener('message', messageReceived);
    }
    download('resources.zip', frac => {
        progressBar.value = 100 * frac;
        setProgressBarColor('#0075FF');
    }).then(onDownload);
}

export function exit() {
    window.removeEventListener('resize', windowResized);
    window.removeEventListener('touchmove', onTouchMove);

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.removeEventListener('message', messageReceived);
    }
}

function setProgressBarColor(color: string) {

    if (progressBar) {
        if (color === progressBar.style.color) {
            return;
        }
        progressBar.style.color = color;
    }

    const styleId: string = 'progress-bar-style';

    let styleSheet: HTMLStyleElement | null = document.getElementById(styleId) as HTMLStyleElement;

    if (!styleSheet) {
        styleSheet = document.createElement("style");
        styleSheet.id = styleId;
        document.head.appendChild(styleSheet);
    }

    styleSheet.innerText = `
        #loading-progress::-webkit-progress-value {
            background-color: ${color} !important;
        }
        #loading-progress::-moz-progress-bar {
            background-color: ${color} !important;
        }
    `;
}

function messageReceived(e: MessageEvent<number>) {
    if (progressBar) {
        progressBar.value = 100 * e.data;
        setProgressBarColor('#48D800');
    }
}

function onDownload(arrayBuffer: Uint8Array) {
    new JSZip().loadAsync(arrayBuffer).then(zip => Object.entries(zip.files).forEach(entry => {
        const [ filename, fileData ] = entry;
        if (fileData.dir) {
            return;
        }
        if (filename.endsWith('.mp3')) {
            decodeAudioData(filename, fileData);
        }
    }));

    waitForDecodes().then(() => {
        (document.getElementById('loading-progress') as HTMLProgressElement).value = 100;
        exit();
        enterStart();
    });
}

function onTouchMove(e: TouchEvent) {
    e.preventDefault();
}

function windowResized() {
    const progressContainer = document.getElementById('progress-container') as HTMLDivElement;
    const progressDiv = document.getElementById('progress-div') as HTMLDivElement;

    progressDiv.style.top = progressDiv.style.left = progressDiv.style.transform = '';
    progressDiv.style.display = 'none';

    const innerWidth = window.innerWidth;
    const innerHeight = window.innerHeight;
    landscape = (innerWidth >= innerHeight);

    progressContainer.style.width = `${innerWidth}px`;
    progressContainer.style.height = `${innerHeight}px`;

    progressDiv.style.display = 'flex';

    if (landscape) {
        const rect = progressDiv.getBoundingClientRect();
        progressDiv.style.left = `${(innerWidth - rect.width) / 2}px`
        progressDiv.style.top = `${(innerHeight - rect.height) / 2}px`;
    } else {
        progressDiv.style.transform = 'rotate(-90deg)';
        const rect = progressDiv.getBoundingClientRect();
        progressDiv.style.left = `${(innerWidth - rect.height) / 2}px`
        progressDiv.style.top = `${(innerHeight - rect.width) / 2}px`;
    }
}