import app from 'firebase/app';
import firebase from 'firebase';


const firebaseConfig = {
  apiKey: "AIzaSyAa0sCB1NoggCgQxt7DQKQO_P1kM38f33A",
  authDomain: "pi-final-55c1e.firebaseapp.com",
  projectId: "pi-final-55c1e",
  storageBucket: "pi-final-55c1e.firebasestorage.app",
  messagingSenderId: "430896990601",
  appId: "1:430896990601:web:def4473d35e378b0517958"
};

app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = app.firestore();