import { enter as enterProgress } from "./progress";
import { enter as enterDeath } from "./death";

export async function init() {
    document.removeEventListener('DOMContentLoaded', init);

    if ('serviceWorker' in navigator && !navigator.serviceWorker.controller) {
        window.location.href = '../pwa.html';
        return;
    }

    window.addEventListener('error', e => {
        console.error(`Caught in global handler: ${e.message}`, {
            source: e.filename,
            lineno: e.lineno,
            colno: e.colno,
            error: e.error
        });
        e.preventDefault();
        enterDeath();
    });
    window.addEventListener('unhandledrejection', e => e.preventDefault());
    document.addEventListener('dblclick', e => e.preventDefault(), { passive: false });

    enterProgress();
}

document.addEventListener('DOMContentLoaded', init);