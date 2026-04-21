/* eslint-disable no-undef */
self.addEventListener('push', function(event) {
  if (event.data) {
    try {
      const data = event.data.json();
      
      const options = {
        body: data.body,
        icon: data.icon || '/favicon.svg',
        badge: '/favicon.svg',
        data: data.data,
        vibrate: [100, 50, 100],
        actions: [
          {
            action: 'view-order',
            title: 'Voir la commande'
          }
        ]
      };

      event.waitUntil(
        self.registration.showNotification(data.title, options)
      );
    } catch {
      // Fallback for non-JSON push
      event.waitUntil(
        self.registration.showNotification('Rahima Store', {
          body: event.data.text(),
          icon: '/favicon.svg'
        })
      );
    }
  }
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();

  if (event.action === 'view-order' || event.notification.data?.url) {
    const urlToOpen = event.notification.data?.url || '/admin/orders';
    event.waitUntil(
      clients.matchAll({ type: 'window', includeUncontrolled: true }).then(windowClients => {
        for (let i = 0; i < windowClients.length; i++) {
          const client = windowClients[i];
          if (client.url.includes(urlToOpen) && 'focus' in client) {
            return client.focus();
          }
        }
        if (clients.openWindow) {
          return clients.openWindow(urlToOpen);
        }
      })
    );
  } else {
    event.waitUntil(
      clients.openWindow('/admin/orders')
    );
  }
});
