// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore' 


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCXVbGj8QGwn3mP0ulnGnH26yLTTXhaMTk",
  authDomain: "sphere-wallet.firebaseapp.com",
  projectId: "sphere-wallet",
  storageBucket: "sphere-wallet.appspot.com",
  messagingSenderId: "955153298125",
  appId: "1:955153298125:web:df6c33dfe22e09afebef84"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);
export const db = getFirestore(app);