declare const self: ServiceWorkerGlobalScope;

const CACHE_NAME = 'lunar-explorer-2024-02-16';
const URLS_TO_CACHE: string[] = [
    // 'app.bundle.js',
    // 'app.css',
    // 'app.html',
    // 'apple-touch-icon.png',
    // 'favicon.ico',
    // 'favicon.svg',
    // 'google-touch-icon-192.png',
    // 'google-touch-icon-512.png',
    // 'jszip.bundle.js',
    // 'lunar-explorer.zip',
    // 'manifest.json',
    // 'mask-icon.svg',
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

self.addEventListener('activate', e => {
    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(cacheNames.filter(cacheName => cacheName !== CACHE_NAME)
                .map(cacheName => caches.delete(cacheName)));
        }).then(() => self.clients.claim())
    );
});

self.addEventListener('install', e => {
    e.waitUntil((async () => {
        const cache = await caches.open(CACHE_NAME);
        await cache.addAll(URLS_TO_CACHE);
    })());
});

self.addEventListener('fetch', e => {

    console.log(`*** FETCH: ${e.request.url}`);

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
            if (fetchResponse.ok) {
                await cache.put(e.request, fetchResponse.clone());
            } else {
                console.log(`${e.request.url}: ${fetchResponse.status}`);
            }
            return fetchResponse;
        } catch {
            return new Response('Service Unavailable', { status: 503 });
        }
    })());
});


