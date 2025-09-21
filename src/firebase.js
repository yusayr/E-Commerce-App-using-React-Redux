import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAPCvX49h2PEO_C8HxoZnQNHjuPVreRYN0",
  authDomain: "e-commerce-77cb1.firebaseapp.com",
  projectId: "e-commerce-77cb1",
  storageBucket: "e-commerce-77cb1.firebasestorage.app",
  messagingSenderId: "233161762907",
  appId: "1:233161762907:web:0e6267c9860b68ae50f77e",
  measurementId: "G-M4P3CZLNK5",
  databaseURL: "https://e-commerce-77cb1-default-rtdb.firebaseio.com",
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
