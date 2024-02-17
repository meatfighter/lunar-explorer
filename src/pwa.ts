function startApp() {
    window.removeEventListener('error',onError);
    window.removeEventListener('unhandledrejection', onUnhandledRejection);
    document.removeEventListener('dblclick', onDoubleClick);
    window.removeEventListener('touchmove', onTouchMove);

    window.location.href = 'app/app.html';
}

export function init() {
    window.addEventListener('error',onError);
    window.addEventListener('unhandledrejection', onUnhandledRejection);
    document.addEventListener('dblclick', onDoubleClick, { passive: false });
    window.addEventListener('touchmove', onTouchMove, { passive: false });

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.bundle.js?v=2024-02-17')
            .then(_ => navigator.serviceWorker.ready)
            .then(_ => startApp());
    } else {
        startApp();
    }
}

function onError(e: ErrorEvent) {
    console.error(`Caught in global handler: ${e.message}`, {
        source: e.filename,
        lineno: e.lineno,
        colno: e.colno,
        error: e.error
    });
    e.preventDefault();
}

function onUnhandledRejection(e: PromiseRejectionEvent) {
    e.preventDefault();
}

function onDoubleClick(e: MouseEvent) {
    e.preventDefault();
}

function onTouchMove(e: TouchEvent) {
    e.preventDefault();
}

document.addEventListener('DOMContentLoaded', init);