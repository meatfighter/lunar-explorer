function initApp() {
    import('./app').then(app => app.init());
}

export function init() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('scripts/sw.bundle.js', { scope: '/' }).then(_ => initApp());
    } else {
        initApp();
    }
}

document.addEventListener('DOMContentLoaded', init);