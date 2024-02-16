declare const self: ServiceWorkerGlobalScope;

const CACHE_NAME = 'lunar-explorer-v1';
const URLS_TO_CACHE = [
    'app.bundle.js',
    'app-chunk.bundle.js',
    'app.css',
    'app.html',
    'index.bundle.js',
    'index.css',
    'index.html',
    'lunar-explorer.zip',
    'jszip.bundle.js',
];

/**
 * Performs a fetch request with retry logic.
 *
 * @param request Request to execute or URL to fetch.
 * @param options The options for the fetch request.
 * @param retries Number of times to retry the fetch.
 * @param retryDelay Delay between retries in milliseconds.
 * @returns A Promise that resolves with the Response object.
 */
export async function fetchWithRetry(request: Request | string, options: RequestInit = {}, retries = 5,
                                     retryDelay = 1000) {

    let attempt = retries - 1;
    while (true) {
        try {
            const response = await fetch(request, options);
            if (response.ok) {
                return response;
            }
        } catch {
        }
        if (--attempt < 0) {
            break;
        }
        await new Promise(resolve => setTimeout(resolve, retryDelay));
    }
    throw new Error('Failed to fetch.');
}


self.addEventListener('install', e => {
    e.waitUntil((async () => {
        const cache = await caches.open(CACHE_NAME);
        await cache.addAll(URLS_TO_CACHE);
    })());
});

self.addEventListener('fetch', e => {
    e.respondWith((async () => {
        const cache = await caches.open(CACHE_NAME);
        const cachedResponse = await cache.match(e.request);

        if (cachedResponse) {
            return cachedResponse;
        }

        try {
            const fetchResponse = await fetchWithRetry(e.request,
                    (new URL(e.request.url).hostname !== self.location.hostname)
                            ? { mode: 'cors', credentials: 'omit' }
                            : {});
            await cache.put(e.request, fetchResponse.clone());
            return fetchResponse;
        } catch {
            return new Response('Service Unavailable', { status: 503 });
        }
    })());
});

self.addEventListener('activate', e => {
    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(cacheNames.filter(cacheName => cacheName !== CACHE_NAME)
                    .map(cacheName => caches.delete(cacheName)));
        }).then(() => self.clients.claim())
    );
});
