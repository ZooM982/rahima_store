import api from './api';

const VAPID_PUBLIC_KEY = "BG6GrtIaw2lC35wfT-wVT6gDuYG4mKaxPYj8HQA4g234OyM98iUu37yqU6Lq5GOi3Hl-N4TR_F33LGxx7pHIlHA";

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export const subscribeToPushNotifications = async () => {
  if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
    console.warn('Push notifications are not supported by this browser');
    return;
  }

  try {
    // 1. Register and wait for Service Worker to be ready
    await navigator.serviceWorker.register('/sw.js');
    const registration = await navigator.serviceWorker.ready;

    // 2. Request permission
    const permission = await Notification.requestPermission();
    if (permission !== 'granted') {
      return;
    }

    // 3. Subscribe to Push Manager
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY)
    });

    // 4. Send subscription to periodic backend
    await api.post('/notifications/subscribe', {
      subscription,
      isAdmin: true // We only call this for admins in this context
    });

  } catch (error) {
    if (import.meta.env.DEV) {
      console.debug('Push notification subscription skipped or failed in DEV:', error.message);
    } else {
      console.error('Push notification subscription error:', error);
    }
  }
};
