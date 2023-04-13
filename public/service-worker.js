const HOSTNAME_WHITELIST = [
    self.location.hostname,
    'fonts.gstatic.com',
    'fonts.googleapis.com',
    'cdn.jsdelivr.net'
];

// Function to get a fixed URL with cache-busting parameter
const getFixedUrl = (req) => {
    const now = Date.now();
    const url = new URL(req.url);

    // Append cache-busting parameter to the query string
    if (url.hostname === self.location.hostname) {
        url.search += (url.search ? '&' : '?') + 'cache-bust=' + now;
    }
    return url.href;
};

self.addEventListener('activate', event => {
    event.waitUntil(self.clients.claim()); // Ensure immediate control of all open clients
});

self.addEventListener('fetch', event => {
    if (HOSTNAME_WHITELIST.indexOf(new URL(event.request.url).hostname) > -1) {
        const cached = caches.match(event.request); // Check if requested resource is already cached
        const fixedUrl = getFixedUrl(event.request); // Get fixed URL with cache-busting parameter
        const fetched = fetch(fixedUrl, {
            cache: 'no-store'
        }); // Fetch the resource from the server
        const fetchedCopy = fetched.then(resp => resp.clone()); // Create a clone of the fetched response

        // Respond with cached version if available, or fetch fresh version in the background
        event.respondWith(
            Promise.race([fetched.catch(_ => cached), cached])
            .then(resp => resp || fetched)
            .catch(_ => {})
        );

        // Cache the fetched response for future use
        event.waitUntil(
            Promise.all([fetchedCopy, caches.open("pwa-cache")])
            .then(([response, cache]) => response.ok && cache.put(event.request, response))
            .catch(_ => {})
        );
    }
});