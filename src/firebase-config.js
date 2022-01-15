// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC5cIMHDkPRFjilYrZkAuW_J7TV1M28rvM",
  authDomain: "react-firebase9-eee56.firebaseapp.com",
  projectId: "react-firebase9-eee56",
  storageBucket: "react-firebase9-eee56.appspot.com",
  messagingSenderId: "778586451850",
  appId: "1:778586451850:web:02517fe8a88d1229f42273",
  measurementId: "G-Y4HJ18XDEX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
