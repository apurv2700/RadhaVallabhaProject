// firebase.js
import firebase from 'firebase/app';
import 'firebase/auth'; // for authentication




if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
