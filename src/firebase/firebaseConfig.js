import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAufFxopGtzeUjzgHwJ-ltj7apqPLkwRCY",
  authDomain: "ascent-server.firebaseapp.com",
  projectId: "ascent-server",
  storageBucket: "ascent-server.appspot.com",
  messagingSenderId: "15880228153",
  appId: "1:15880228153:web:1229c71553948f2fb3ece8",
  measurementId: "G-ZK59G7WHBV",
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);