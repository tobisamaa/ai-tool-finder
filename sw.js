// AI Tool Finder - Service Worker for PWA
// Enables offline caching and install prompt on mobile

var CACHE_NAME = 'aitf-v1';
var OFFLINE_URL = '/404.html';

var PRECACHE_URLS = [
    '/',
    '/index.html',
    '/css/style.css',
    '/css/conversion.css',
    '/js/main.js',
    '/js/conversion.js'
];

// Install: precache critical assets
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll(PRECACHE_URLS);
        })
    );
    self.skipWaiting();
});

// Activate: clean old caches
self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(keys) {
            return Promise.all(
                keys.filter(function(key) {
                    return key !== CACHE_NAME;
                }).map(function(key) {
                    return caches.delete(key);
                })
            );
        })
    );
    self.clients.claim();
});

// Fetch: network-first with cache fallback
self.addEventListener('fetch', function(event) {
    // Skip non-GET requests
    if (event.request.method !== 'GET') return;

    // Skip external requests
    if (!event.request.url.startsWith(self.location.origin)) return;

    event.respondWith(
        fetch(event.request).then(function(response) {
            // Clone and cache successful responses
            if (response.status === 200) {
                var clone = response.clone();
                caches.open(CACHE_NAME).then(function(cache) {
                    cache.put(event.request, clone);
                });
            }
            return response;
        }).catch(function() {
            // Fallback to cache
            return caches.match(event.request).then(function(cached) {
                return cached || caches.match(OFFLINE_URL);
            });
        })
    );
});
