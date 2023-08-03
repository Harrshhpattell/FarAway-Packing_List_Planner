let cacheData = "appV1";

// to store in cache

this.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(cacheData).then((cache) => {
      cache.addAll([
        "/FarAway-Packing_List_Planner/static/js/bundle.js",
        "/FarAway-Packing_List_Planner/manifest.json",
        "/FarAway-Packing_List_Planner/index.html",
        "/FarAway-Packing_List_Planner/icons/icon-512.png",
        "/FarAway-Packing_List_Planner/icons/icon-1024.png",
        "/FarAway-Packing_List_Planner/ws",
        "/FarAway-Packing_List_Planner/",
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
