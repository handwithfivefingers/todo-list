importScripts(
  'https://www.gstatic.com/firebasejs/9.9.3/firebase-app-compat.js'
);
importScripts(
  'https://www.gstatic.com/firebasejs/9.9.3/firebase-messaging-compat.js'
);

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  // apiKey: 'AIzaSyCtJPIdv7iG_cc19h5YkapMfJSVw8Qpf1M',
  // authDomain: 'push-notification-3ea3d.firebaseapp.com',
  // projectId: 'push-notification-3ea3d',
  // storageBucket: 'push-notification-3ea3d.appspot.com',
  // messagingSenderId: '863626441436',
  // appId: '1:863626441436:web:37eb8f6e2a96121e5aba19',

  apiKey: 'AIzaSyCzg8mSMFqkArE1jDQH1p7cVuMSUNCJMiM',
  authDomain: 'todo-truyenmai.firebaseapp.com',
  projectId: 'todo-truyenmai',
  storageBucket: 'todo-truyenmai.appspot.com',
  messagingSenderId: '499784443670',
  appId: '1:499784443670:web:2205572d057b1589989237',
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log('Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
