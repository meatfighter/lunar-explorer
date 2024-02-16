declare const serviceWorker: ServiceWorkerGlobalScope;

const CACHE_NAME = 'lunar-explorer-v1';
const URLS_TO_CACHE = [
    '/',
    '/app.html',
    '/styles/app.css',
    '/script/app.bundle.js',
    '/resources/lunar-explorer.zip'
];

serviceWorker.addEventListener('install', event => {
    event.waitUntil((async () => {
        const cache = await caches.open(CACHE_NAME);
        await cache.addAll(URLS_TO_CACHE);
    })());
});

serviceWorker.addEventListener('fetch', event => {
    event.respondWith((async () => {
        const cache = await caches.open(CACHE_NAME);
        const cachedResponse = await cache.match(event.request);

        if (cachedResponse) {
            return cachedResponse;
        } else {
            try {
                const fetchResponse = await fetch(event.request);
                await cache.put(event.request, fetchResponse.clone());
                return fetchResponse;
            } catch (ignored) {
                return new Response('Service Unavailable', { status: 503 });
            }
        }
    })());
});
