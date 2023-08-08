// let cacheData = "appV1";

// // to store in cache

// this.addEventListener("install", (event) => {
//   event.waitUntil(
//     caches.open(cacheData).then((cache) => {
//       cache.addAll([
//         "/static/js/bundle.js",
//         "/favicon.ico",
//         "/manifest.json",
//         "/index.html",
//         "/ws",
//         "/",
//       ]);
//     })
//   );
// });

// // offline (fetch from cache)
// this.addEventListener("fetch", (event) => {
//   // check internet connection
//   if (!navigator.onLine) {
//     event.respondWith(
//       caches.match(event.request).then((resp) => {
//         if (resp) {
//           return resp;
//         }
//       })
//     );
//   }
// });

var cacheData = "appV1";

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(cacheData).then(function (cache) {
      return cache.addAll([
        "/static/js/bundle.js",
        "/favicon.ico",
        "/manifest.json",
        "/index.html",
        "/ws",
        "/",
      ]);
    })
  );
});

self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (cachedResponse) {
      // Return cached response if available
      if (cachedResponse) {
        return cachedResponse;
      }

      // If not in cache, fetch the request
      return fetch(event.request).then(function (networkResponse) {
        // Cache the fetched response for future use
        return caches.open(cacheData).then(function (cache) {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
      });
    })
  );

  // Offline event: Handle offline requests
  if (!navigator.onLine) {
    event.respondWith(
      caches.match(event.request).then(function (cachedResponse) {
        if (cachedResponse) {
          return cachedResponse; // Respond with cached data if available
        }
      })
    );
  }
});
