// Nome do cache — mude a versão se atualizar o app (ex: v2, v3...)
const CACHE = 'calc-shopee-v1';

// Arquivos que ficam salvos no celular pra funcionar offline
const ARQUIVOS = [
  './index.html',
  './manifest.json'
];

// Instala e guarda os arquivos no cache
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE).then(function(cache) {
      return cache.addAll(ARQUIVOS);
    })
  );
});

// Quando o app pede um arquivo, entrega do cache se tiver
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(resposta) {
      // Se achou no cache, usa o cache. Senão, busca na internet.
      return resposta || fetch(event.request);
    })
  );
});

// Remove caches antigos quando atualizar a versão
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(chaves) {
      return Promise.all(
        chaves.filter(function(chave) {
          return chave !== CACHE;
        }).map(function(chave) {
          return caches.delete(chave);
        })
      );
    })
  );
});
