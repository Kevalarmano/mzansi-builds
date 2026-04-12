import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// YOUR REAL CONFIG (from Firebase console)
const firebaseConfig = {
  apiKey: "AIzaSyCHpYx8lJCgp4A3NpGL2mLP8_1nBl6hyl4",
  authDomain: "mzansibuilds.firebaseapp.com",
  projectId: "mzansibuilds",
  storageBucket: "mzansibuilds.firebasestorage.app",
  messagingSenderId: "612887133683",
  appId: "1:612887133683:web:2813fb6d6c311194772686",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Services you actually use
export const auth = getAuth(app);
export const db = getFirestore(app);