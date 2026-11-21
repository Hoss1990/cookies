// Service worker Cookies & Co — change VERSION pour forcer la mise à jour du cache.
const VERSION = 'cookies-co-v3';
const SHELL = ['/', '/offline.html', '/icons/icon-192.png', '/icons/icon-512.png'];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(VERSION).then((c) => Promise.all(SHELL.map((u) => c.add(u).catch(() => {})))).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k)))).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  const url = new URL(req.url);
  if (req.method !== 'GET' || url.origin !== location.origin) return; // WhatsApp, polices Google… : réseau direct

  // Pages : réseau d'abord, puis cache, puis page hors-ligne
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req)
        .then((res) => { const copy = res.clone(); caches.open(VERSION).then((c) => c.put(req, copy)); return res; })
        .catch(() => caches.match(req).then((r) => r || caches.match('/offline.html')))
    );
    return;
  }

  // Fichiers statiques (JS/CSS Next, images, icônes) : cache d'abord, mise à jour en arrière-plan
  if (/^\/(_next\/static|images|icons)\//.test(url.pathname) || url.pathname === '/manifest.webmanifest') {
    e.respondWith(
      caches.match(req).then((cached) => {
        const net = fetch(req).then((res) => { if (res.ok) { const copy = res.clone(); caches.open(VERSION).then((c) => c.put(req, copy)); } return res; }).catch(() => cached);
        return cached || net;
      })
    );
  }
});
