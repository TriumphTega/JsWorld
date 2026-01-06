// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAWmlQgPu34uIDOsBBy4J3bdPB4QFue1iI",
  authDomain: "journal-d2fcd.firebaseapp.com",
  projectId: "journal-d2fcd",
  storageBucket: "journal-d2fcd.firebasestorage.app",
  messagingSenderId: "279588365736",
  appId: "1:279588365736:web:47c252930b9fad19fd299d",
  measurementId: "G-6QHND3BWFR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();
signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });

import { getAuth, signOut } from "firebase/auth";

//Sign Out (Add to sign out page)

const auth = getAuth();
signOut(auth)
  .then(() => {
    // Sign-out successful.
  })
  .catch((error) => {
    // An error happened.
  });
