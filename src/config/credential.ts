import firebase from 'firebase/app'
// import 'firebase/firestore';
import 'firebase/firestore';
import 'firebase/auth';
const firebaseConfig = {
    apiKey: "AIzaSyA2vJNe4u8Y2qgHFRKZS4xChosResI16aA",
    authDomain: "book-app-4459c.firebaseapp.com",
    projectId: "book-app-4459c",
    storageBucket: "book-app-4459c.appspot.com",
    messagingSenderId: "495034537589",
    appId: "1:495034537589:web:08ba63128e8489c97e8a3c",
    measurementId: "G-9L0T3Y92JW"
  };
  firebase.initializeApp(firebaseConfig);
  // firebase.firestore();
  // const auth = firebase.auth ();

export default firebase;