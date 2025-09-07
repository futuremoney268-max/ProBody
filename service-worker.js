const CACHE_NAME = "probody-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/login.html",
  "/trainer.html",
  "/music.html",
  "/capture.html",
  "/style.css",
  "/script.js",
  "/Logo.png",
  "/Tere jaisa.mp3",
  "/1side.png",
  "/back.png",
  "/front.png",
  "/Screenshot_1.jpg",
  "/Screenshot_2.jpg",
  "/Screenshot_3.jpg",
  "/favicon/favicon-16x16.png",
  "/favicon/favicon-32x32.png",
  "/favicon/android-chrome-192x192.png",
  "/favicon/android-chrome-512x512.png",
  "/favicon/apple-touch-icon.png",
  "/favicon/favicon.ico",
  "/manifest.json"
];

// Install event → cache files
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log("Caching app files...");
      return cache.addAll(urlsToCache);
    })
  );
});

// Activate event → clean old caches
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(key => {
        if (key !== CACHE_NAME) {
          console.log("Removing old cache:", key);
          return caches.delete(key);
        }
      }))
    )
  );
});

// Fetch event → serve from cache first
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});