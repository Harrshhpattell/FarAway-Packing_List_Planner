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

// Install event: Cache initial assets
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

// Fetch event: Handle network requests
self.addEventListener("fetch", function (event) {
  // Check if the request is in the cache
  event.respondWith(
    caches.match(event.request).then(function (resp) {
      if (resp) {
        return resp; // Return cached response if available
      }

      // If not in cache, fetch the request
      return fetch(event.request).then(function (networkResp) {
        // Cache the fetched response for future use
        return caches.open(cacheData).then(function (cache) {
          cache.put(event.request, networkResp.clone());
          return networkResp;
        });
      });
    })
  );
});

// Offline event: Handle offline requests
self.addEventListener("fetch", function (event) {
  if (!navigator.onLine) {
    event.respondWith(
      caches.match(event.request).then(function (resp) {
        if (resp) {
          return resp; // Respond with cached data if available
        }
      })
    );
  }
});
