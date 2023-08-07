let cacheData = "appV1";

// to store in cache

this.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(cacheData).then((cache) => {
      cache.addAll([
        "/static/js/bundle.js",
        "/favicon.ico",
        "/static/js/main.chunk.js",
        "/static/js/0.chunk.js",
        "/manifest.json",
        "/index.html",
        "/ws",
        "/swDev.js",
        "/",
      ]);
    })
  );
});

// offline (fetch from cache)
this.addEventListener("fetch", (event) => {
  // check internet connection
  if (!navigator.onLine) {
    event.respondWith(
      caches.match(event.request).then((resp) => {
        if (resp) {
          return resp;
        }
      })
    );
  }
});
