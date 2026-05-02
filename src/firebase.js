import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDzwwRh9boCHbP1mEYvoiAFL_x-neZujQY",
    authDomain: "raite-app-144dd.firebaseapp.com",
    projectId: "raite-app-144dd",
    storageBucket: "raite-app-144dd.firebasestorage.app",
    messagingSenderId: "315968689503",
    appId: "1:315968689503:web:26a4ddc2fedd23e4a912ea",
    measurementId: "G-9QJR3L940V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
