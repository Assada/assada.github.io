self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open('mysite-static-v3').then(function (cache) {
            return cache.addAll([
                '/css/main.css',
                '/favicon.ico',
                '/js/katex_init.js'
                // etc
            ]);
        })
    );
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.open('mysite-dynamic').then(function (cache) {
            return cache.match(event.request).then(function (response) {
                var fetchPromise = fetch(event.request).then(function (networkResponse) {
                    cache.put(event.request, networkResponse.clone());
                    return networkResponse;
                })
                return response || fetchPromise;
            })
        })
    );
});