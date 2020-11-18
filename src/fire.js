import firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyD0Pi07rSgPmYoqo2d-ZgDf32zcfQBjPAs',
  authDomain: 'stuff-292219.firebaseapp.com',
  databaseURL: 'https://stuff-292219.firebaseio.com',
  projectId: 'stuff-292219',
  storageBucket: 'stuff-292219.appspot.com',
  messagingSenderId: '916511379365',
  appId: '1:916511379365:web:77ee66e0d9778e9e70e24c',
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth;

const db = firebase.firestore();
db.settings({ timestampsInSnapshots: true });

export { auth, db };
