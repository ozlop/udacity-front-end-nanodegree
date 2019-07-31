self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open('restaurant-static').then(function(cache) {
            return cache.add('/')
        })
    )
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            if (response) return response
            return fetch(event.request)
        })
    )
})
