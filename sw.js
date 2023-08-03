let cacheData = "appV1";

// To store in cache during installation
this.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(cacheData).then((cache) => {
      return cache.addAll([
        "/static/js/bundle.js",
        "/manifest.json",
        "/index.html",
        "/icons/icon-512.png",
        "/icons/icon-1024.png",
        "/ws",
        "/", // This is the root URL, adjust it as needed
      ]);
    })
  );
});

// Fetch event for offline support
this.addEventListener("fetch", (event) => {
  // Check internet connection
  if (!navigator.onLine) {
    event.respondWith(
      caches.match(event.request).then((resp) => {
        if (resp) {
          return resp;
        }
      })
    );
  } else {
    // If online, update cache with the latest version from the server
    event.respondWith(
      caches.open(cacheData).then((cache) => {
        return fetch(event.request).then((response) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
    );
  }
});

// Activate event to handle service worker updates
this.addEventListener("activate", (event) => {
  const cacheWhitelist = [cacheData];

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
