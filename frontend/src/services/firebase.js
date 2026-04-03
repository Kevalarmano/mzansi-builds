import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCHpYx8lJCgp4A3NpGL2mLP8_1nBl6hyl4",
  authDomain: "mzansibuilds.firebaseapp.com",
  projectId: "mzansibuilds",
  storageBucket: "mzansibuilds.firebasestorage.app",
  messagingSenderId: "612887133683",
  appId: "1:612887133683:web:2813fb6d6c311194772686"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);