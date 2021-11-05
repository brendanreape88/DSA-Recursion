import { decode, encode } from 'base-64';
import './timerConfig';
global.addEventListener = (x) => x;
if (!global.btoa) {
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}

import firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

// old DB
var firebaseConfig = {
  apiKey: 'AIzaSyDkma4q-csEmgzJXBIG2iWFMtxNa9TA1ME',
  authDomain: 'kazoo-app.firebaseapp.com',
  projectId: 'kazoo-app',
  storageBucket: 'kazoo-app.appspot.com',
  messagingSenderId: '477993886172',
  appId: '1:477993886172:web:179e66284280613e3eaf19',
  measurementId: 'G-G734P421Q6',
};

// new DB with rules

// var firebaseConfig = {
//   apiKey: 'AIzaSyCdLHjNZGq77t4klrWnIfpSd4vPdzQ2cNE',
//   authDomain: 'kazoo-app-dev.firebaseapp.com',
//   projectId: 'kazoo-app-dev',
//   storageBucket: 'kazoo-app-dev.appspot.com',
//   messagingSenderId: '94757612768',
//   appId: '1:94757612768:web:244ba8fdddee0d667ef485',
// };

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Use emulator
/*
const db = firebase.firestore();
db.settings({ host: 'localhost:8080', ssl: false });
const auth = firebase.auth();
auth.useEmulator('http://localhost:9099');

export { firebase, db, auth };
*/
export { firebase };
