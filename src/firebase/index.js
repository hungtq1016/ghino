// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB4fS53sipllW-s6NxQ0uUTLgAYFXoehxA",
  authDomain: "debit-74eee.firebaseapp.com",
  projectId: "debit-74eee",
  storageBucket: "debit-74eee.appspot.com",
  messagingSenderId: "395569701569",
  appId: "1:395569701569:web:d76358954195aad20a6a40"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export{
    db
}