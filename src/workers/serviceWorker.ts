self.addEventListener("install", (event: any) => {
    event.waitUntil(
        caches.open("v1.0.0").then((cache) => {
            return cache.addAll([
                ".",
                "./index.html",
                "./js/dntd.js",
                "./js/helpers.js",
                "./css/styles.css",
                "./images/favicon.ico",
                "./js/syncWebWorker.js",
                "./manifest.webmanifest",
                "./images/splash512.png",
                "./images/splash192.png",
                "./images/coverage_badge.svg",
                "https://apis.google.com/js/api.js",
                "https://unpkg.com/mithril@2.0.4/mithril.min.js",
            ])
        })
    )
})

self.addEventListener('fetch', (event: any) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    )
})
