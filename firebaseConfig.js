// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAWmlQgPu34uIDOsBBy4J3bdPB4QFue1iI",
  authDomain: "journal-d2fcd.firebaseapp.com",
  projectId: "journal-d2fcd",
  storageBucket: "journal-d2fcd.firebasestorage.app",
  messagingSenderId: "279588365736",
  appId: "1:279588365736:web:47c252930b9fad19fd299d",
  measurementId: "G-6QHND3BWFR"
};

//Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);