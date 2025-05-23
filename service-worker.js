self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('pwa-sample-cache').then(function(cache) {
      return cache.addAll([
        './',
        './baby-touch-game.html.html',
        './manifest.json',
        // 画像やCSS、JSファイルがあればここに追加
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        return response || fetch(event.request);
      })
  );
});
