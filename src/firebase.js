// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDClGAoMd1Zud_gPqlwXWSDOR4TISPUsso",
  authDomain: "crud-bebidas.firebaseapp.com",
  projectId: "crud-bebidas",
  storageBucket: "crud-bebidas.appspot.com",
  messagingSenderId: "934528899167",
  appId: "1:934528899167:web:93b13ebb9a35ec4787a3ea"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
export {db}