// let cacheData = "appV1";

// // to store in cache

// this.addEventListener("install", (event) => {
//   event.waitUntil(
//     caches.open(cacheData).then((cache) => {
//       cache
//         .addAll([
//           "/FarAway-Packing_List_Planner/static/js/bundle.js",
//           "/FarAway-Packing_List_Planner/manifest.json",
//           "/FarAway-Packing_List_Planner/index.html",
//           "/FarAway-Packing_List_Planner/icons/icon-512.png",
//           "/FarAway-Packing_List_Planner/icons/icon-1024.png",
//           "/FarAway-Packing_List_Planner/ws",
//           "/FarAway-Packing_List_Planner/",
//         ])
//         // cache
//         //   .addAll([
//         //     "/static/js/bundle.js",
//         //     "/manifest.json",
//         //     "/index.html",
//         //     "/icons/icon-512.png",
//         //     "/icons/icon-1024.png",
//         //     "/ws",
//         //     "/",
//         //   ])
//         .catch((error) => {
//           console.error("Cache.addAll error:", error);
//         });
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

let cacheData = "appV1";
this.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(cacheData).then((cache) => {
      cache.addAll([
        "/static/js/main.chunk.js",
        "/static/js/0.chunk.js",
        "/static/js/bundle.js",
        "/icons/icon-512.png",
        "/icons/icon-1024.png",
        "/index.html",
        "/",
      ]);
    })
  );
});

this.addEventListener("fetch", (event) => {
  if (!navigator.onLine) {
    if (
      event.request.url ===
      "https://harrshhpattell.github.io/FarAway-Packing_List_Planner/static/js/main.chunk.js"
    ) {
      event.waitUntil(
        this.registration.showNotification("Internet", {
          body: "Internet not working !!!",
        })
      );
    }
    event.respondWith(
      caches.match(event.request).then((resp) => {
        if (resp) {
          return resp;
        }
        let requestUrl = event.request.clone();
        fetch(requestUrl);
      })
    );
  }
});
