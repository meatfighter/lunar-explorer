import { NoParamVoidFunc } from "./no-param-void-func";
import { enter, windowResized } from "./game";

let wakeLock: WakeLockSentinel | null = null;
let acquiringWaitLock = false;

let removeMediaEventListener: NoParamVoidFunc | null = null;

function acquireWakeLock() {
    if (!acquiringWaitLock && wakeLock === null && 'wakeLock' in navigator) {
        acquiringWaitLock = true;
        navigator.wakeLock.request('screen')
            .then(w => {
                if (acquiringWaitLock) {
                    wakeLock = w;
                    wakeLock.addEventListener("release", () => {
                        if (!acquiringWaitLock) {
                            wakeLock = null;
                        }
                    });
                }
            }).catch(_ => {
        }).finally(() => acquiringWaitLock = false);
    }
}

const updatePixelRatio = () => {
    if (removeMediaEventListener != null) {
        removeMediaEventListener();
    }
    const media = matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`);
    media.addEventListener("change", updatePixelRatio);
    removeMediaEventListener = () => media.removeEventListener("change", updatePixelRatio);

    windowResized();
};

function init() {
    document.addEventListener('dblclick', e => e.preventDefault(), { passive: false });
    window.addEventListener('touchmove', e => e.preventDefault(), { passive: false });
    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') {
            acquireWakeLock();
        }
    });
    window.addEventListener('resize', windowResized);
    enter();
    updatePixelRatio();
}

document.addEventListener('DOMContentLoaded', init);