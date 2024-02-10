import JSZip from 'jszip';
import { download } from "./download";

const ZIP_DOWNLOAD_PERCENT = 90;

let landscape = false;

export function enter() {
    window.addEventListener('resize', windowResized);
    window.addEventListener('touchmove', onTouchMove, { passive: false });

    const mainElement = document.getElementById('main-content') as HTMLElement;
    mainElement.innerHTML = `
            <div id="progress-div">
                <progress id="loading-progress" value="0" max="100"></progress>
            </div>`;

    windowResized();

    const progressBar = document.getElementById('loading-progress') as HTMLProgressElement;
    download('lunear-explorer.zip', frac => progressBar.value = ZIP_DOWNLOAD_PERCENT * frac).then(onDownload);
}

export function exit() {
    window.removeEventListener('resize', windowResized);
    window.removeEventListener('touchmove', onTouchMove);
}

async function onDownload(arrayBuffer: Uint8Array) {
    const progressBar = document.getElementById('loading-progress') as HTMLProgressElement;
    const zip = new JSZip();
    const entries = Object.entries((await zip.loadAsync(arrayBuffer)).files);

    for (let i = 0; i < entries.length; ++i) {
        const [ filename, fileData ] = entries[i];
        if (fileData.dir) {
            continue;
        }
        if (filename.endsWith('.mp3')) {
            const data = await fileData.async('arraybuffer');
        }
        progressBar.value = ZIP_DOWNLOAD_PERCENT + (100 - ZIP_DOWNLOAD_PERCENT) * i / (entries.length - 1);
    }
}

function onTouchMove(e: TouchEvent) {
    e.preventDefault();
}

function windowResized() {
    const progressDiv = document.getElementById('progress-div') as HTMLDivElement;

    progressDiv.style.top = progressDiv.style.left = progressDiv.style.transform = '';
    progressDiv.style.display = 'none';

    const innerWidth = window.innerWidth;
    const innerHeight = window.innerHeight;
    landscape = (innerWidth >= innerHeight);
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