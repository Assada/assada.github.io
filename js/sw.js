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
    console.log('fetch');
    event.respondWith(
        caches.open('mysite-dynamic').then(function (cache) {
            return fetch(event.request).then(function (response) {
                cache.put(event.request, response.clone());
                return response;
            });
        })
    );
});