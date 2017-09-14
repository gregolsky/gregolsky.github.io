'use strict';
self.addEventListener('push', function (event) {
  if (!event.data)
    return;
  
  const eventData = event.data.json()
  const {
    title,
    body,
    icon,
    tag
  } = eventData;

  const notificationOptions = {
    body,
    icon,
    tag,
    data: {
      download: (eventData.download || null)
    }
  };

  event.waitUntil(self.registration.showNotification(title, notificationOptions));
});

self.addEventListener('notificationclick', function (event) {
  event.notification.close();

  // This looks to see if the current is already open and
  // focuses if it is
  event.waitUntil(clients.matchAll({
    type: 'window'
  }).then(function (clientList) {
    for (let i = 0; i < clientList.length; i++) {
      const client = clientList[i];
      if (client.url === '/' && 'focus' in client) {
        return client.focus();
      }
    }

    if (clients.openWindow) {
      return clients.openWindow('/');
    }
  }));
});