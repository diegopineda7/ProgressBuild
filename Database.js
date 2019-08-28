import * as firebase from 'firebase';

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

export {
  firebaseConfig
}
