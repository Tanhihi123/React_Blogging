// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import {getAuth} from "firebase/auth"
const firebaseConfig = {
  apiKey: "AIzaSyDF1sVEjTuHC3Cf7OWohVKFkbb0NoxoNws",
  authDomain: "react-blogging-6bd7d.firebaseapp.com",
  projectId: "react-blogging-6bd7d",
  storageBucket: "react-blogging-6bd7d.appspot.com",
  messagingSenderId: "417305507081",
  appId: "1:417305507081:web:41b2b8bae33de51c534fd8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);