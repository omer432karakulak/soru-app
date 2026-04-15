// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = { 
  apiKey : "AIzaSyDPhiPezO6IcuftC4aCmYCHTCQDWamqoxM" , 
  authDomain : "soru-app-b63a8.firebaseapp.com" , 
  projectId : "soru-app-b63a8" , 
  storageBucket : "soru-app-b63a8.firebasestorage.app" , 
  messagingSenderId : "794369875166" , 
  appId : "1:794369875166:web:4b23550e03e304cc9ff64f" 
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);