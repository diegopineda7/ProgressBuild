import * as firebase from 'firebase';
import 'firebase/firestore';

var firebaseConfig = {
  apiKey: 'AIzaSyDfhj7_Zni14BEPv3BdoAhBkvSxVw3uc5k',
  authDomain: 'progressbuild-d330f.firebaseapp.com',
  databaseURL: 'https://progressbuild-d330f.firebaseio.com',
  projectId: 'progressbuild-d330f',
  storageBucket: 'gs://progressbuild-d330f.appspot.com/',
  messagingSenderId: '423014082229',
  appId: '1:423014082229:web:fc4e56599ede8ffe'
};

firebase.initializeApp(firebaseConfig);

const dbRef = firebase.firestore();
const ejerciciosRef = dbRef.collection('Ejercicios');
const empujeRef = ejerciciosRef.doc('Empuje');
const haleRef = ejerciciosRef.doc('Hale');
const piernaRef = ejerciciosRef.doc('Pierna');

module.exports = {
  firebaseConfig,
  empujeRef,
  haleRef,
  piernaRef
};