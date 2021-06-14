const APP_PREFIX = 'BudgetTracker-';
const VERSION = 'verson-01';
const CACHE_NAME = APP_PREFIX + VERSION;

//debugged with Phil during office hours, had some typos.
const FILES_TO_CACHE = [
    "./index.html",
    "./js/index.js",
    "./js/idb.js",
    "./css/styles.css",
    "./manifest.json",
    "./icons"
];

//pulling items from cache as resppmse. used code from food-festival module as template. 
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

//event lister for caching resourcres, using food festival module as template

self.addEventListener('install', function (e) {
    e.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            console.log('Nate installing cache : ' + CACHE_NAME)
            return cache.addAll(FILES_TO_CACHE)
        })
    )
})

//cache deletion used food festival module as template
self.addEventListener('activate' , function (e) {
    e.waitUntil(
        caches.keys().then(function (listKeys) {
            let cacheSaveList = listKeys.filter(function (key) {
                return key.indexOf(APP_PREFIX);
            })

            cacheSaveList.push(CACHE_NAME);

            return Promise.all(listKeys.map(function (key, i) {
                if (cacheSaveList.indexOf(key) === -1) {
                    console.log('Nate deleting this cache : ' + listKeys[i] );
                    return caches.delete(listKeys[i]);
                }
            }));
        })
    );
});
