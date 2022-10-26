// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  updateDoc,
} from 'firebase/firestore';

import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: 'AIzaSyCzg8mSMFqkArE1jDQH1p7cVuMSUNCJMiM',
  authDomain: 'todo-truyenmai.firebaseapp.com',
  projectId: 'todo-truyenmai',
  storageBucket: 'todo-truyenmai.appspot.com',
  messagingSenderId: '499784443670',
  appId: '1:499784443670:web:2205572d057b1589989237',
  measurementId: 'G-7SD0B3DPBK',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const database = getFirestore(app);

const analytics = getAnalytics(app);

const messaging = getMessaging(app);

const fetchToken = (setTokenFound) => {
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

const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });

class FireBaseMethods {
  constructor() {}

  createDoc = async (field, params) => {
    let result = {
      status: false,
      data: [],
    };
    try {
      // console.log(field, params);
      let res = await addDoc(collection(database, field), {
        ...params,
      });

      result.status = true;

      result.data = res;
    } catch (error) {
      console.log('create doc error', error);

      result.status = false;
    } finally {
      return result;
    }
  };

  getSingleDoc = () => {};

  getAllDocs = async (field) => {
    const querySnapshot = await getDocs(collection(database, field));

    let _data = querySnapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });

    return _data;
  };

  updateDoc = async (...arg) => {
    console.log(arg);

    try {
      let [field, ...otherThing] = arg;

      console.log(field, otherThing);
    } catch (error) {
      console.log('create doc error', error);
      return false;
    }
  };

  deleteDoc = () => {};
}

const FireBase = new FireBaseMethods();

export { app, analytics, database, fetchToken, onMessageListener, FireBase };
