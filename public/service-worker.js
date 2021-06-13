const APP_PREFIX = 'BudgetTracker-';
const VERSION = 'verson 01';
const CACHE_NAME = APP_PREFIX + VERSION;
const FILES_TO_CACHE = [
    "./index.html",
    "./js/index.js",
    "./js/idb/js",
    "./css/style.css",
    "./manifest.json"
];

//pulling items from cache as resp
self.addEventListener('fetch', function(e) {
    console.log('nate fetch request : ' + e.request.url)
    e.respondWith(
        caches.match(e.request).then(function (request) {
            if (request) {
                console.log('Nate responding with cache : ' + e.request.url)
                return request
            }

            else {
                console.log('Nate file is not cached, fetching :' + e.request.url)
                return fetch(e.request)
            }
        })
    )
})
