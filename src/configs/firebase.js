// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: 'AIzaSyCtJPIdv7iG_cc19h5YkapMfJSVw8Qpf1M',
  authDomain: 'push-notification-3ea3d.firebaseapp.com',
  databaseURL: 'https://push-notification-3ea3d.firebaseio.com',
  projectId: 'push-notification-3ea3d',
  storageBucket: 'push-notification-3ea3d.appspot.com',
  messagingSenderId: '863626441436',
  appId: '1:863626441436:web:37eb8f6e2a96121e5aba19',
  measurementId: 'G-D4B6EHSY9P',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const messaging = getMessaging(app);

export const fetchToken = (setTokenFound) => {
  return getToken(messaging, {
    vapidKey:
      'BBkQ-6d5wmQNxKbliB7XgljJSDpS9LLZBzqZv_araUX9skJBs0_T42tzYDhtKPNHb3D4dYhI1GFSSSdEt2_dof0',
  })
    .then((currentToken) => {
      if (currentToken) {
        console.log('current token for client: ', currentToken);
        setTokenFound(true);
        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        console.log(
          'No registration token available. Request permission to generate one.'
        );
        setTokenFound(false);
        // shows on the UI that permission is required
      }
    })
    .catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
      // catch error while creating client token
    });
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });

export { app, analytics };
