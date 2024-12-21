// Import necessary Firebase functions
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyD0cgZ-seAF7VyPJFH8VFKnArYs7SezapI",
  authDomain: "stock-market-4b901.firebaseapp.com",
  projectId: "stock-market-4b901",
  storageBucket: "stock-market-4b901.firebasestorage.app",
  messagingSenderId: "696928209564",
  appId: "1:696928209564:web:705f68da082cbd1265bb59",
  measurementId: "G-KY4N59CRKH"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Get Firestore and Auth services
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export { db, auth };
