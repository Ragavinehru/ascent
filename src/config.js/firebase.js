// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyB5m3rXCyd-KEl9M9cWvuP1Bt-2mojR6B0",
    authDomain: "ascent-auth-19560.firebaseapp.com",
    projectId: "ascent-auth-19560",
    storageBucket: "ascent-auth-19560.appspot.com",
    messagingSenderId: "266266399552",
    appId: "1:266266399552:web:5b4436ab0c7010573a60a5"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);