import (app) from "./firebaseConfig.js";

// ✅ New SDK (modular) - what you should use
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
const auth = getAuth(app);
createUserWithEmailAndPassword(auth, email, password)

const firebaseApp = firebase.initializeApp({
    //Your own Firebase Credentials..
});



const register = () => {
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value

    auth.createUserWithEmailAndPassword(email, password)
    .then((res) => {
        console.log(res.user)
    })
    .catch((err) => {
        alert(err.message)
        console.log(err.code)
        console.log(err.message)
    })
}

const login = () => {
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value

    auth.signInWithEmailAndPassword(email, password)
    .then((res) => {
        console.log(res.user)
    })
    .catch((err) => {
        alert(err.message)
        console.log(err.code)
        console.log(err.message)
    })
}

const saveData = () => {
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value

    db.collection('users')
    .add({
        email: email,
        password: password
    })
    .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    });
}

const readData = () => {
    db.collection('users')
    .get()
    .then((data) => {
        console.log(data.docs.map((item) => {
            return {...item.data(), id: item.id}
        }))
    })
}

const updateData = () => {
    db.collection('users').doc('6caYOiNxwviOJFIQ4Uag')
    .update({
        email: 'ashishisagoodboy1234@gmail.com',
        password: '123456'
    })
    .then(() => {
        alert('Data Updated')
    })
}

const deleteData = () => {
    db.collection('users').doc('6caYOiNxwviOJFIQ4Uag').delete()
    .then(() => {
        alert('Data Deleted')
    })
    .catch((err) =>{
        console.log(err)
    })
}

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
