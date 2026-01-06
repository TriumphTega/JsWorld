import (app) from "./firebaseConfig";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default function App() {
    
}
const auth = getAuth();
createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });