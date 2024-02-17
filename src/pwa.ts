function startApp() {
    window.location.href = 'app/app.html';
}

export function init() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.bundle.js?v=2024-02-17').then(_ => startApp());
    } else {
        startApp();
    }
}

document.addEventListener('DOMContentLoaded', init);