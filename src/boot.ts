function initApp() {
    import(/* webpackChunkName: "app-chunk" */ './app').then(app => app.init());
}

export function init() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.bundle.js').then(_ => initApp());
    } else {
        initApp();
    }
}

document.addEventListener('DOMContentLoaded', init);