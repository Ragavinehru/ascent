import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB8l7W3wOccGC-A_p8qTfMtbnO9Fl6kOK4",
  authDomain: "ascent-app-9e1ae.firebaseapp.com",
  projectId: "ascent-app-9e1ae",
  storageBucket: "ascent-app-9e1ae.appspot.com",
  messagingSenderId: "70834123",
  appId: "1:70834123:web:2e47c8a86ef746225b884e"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);