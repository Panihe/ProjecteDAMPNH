// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { initializeFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyANBfHEF1zTVEgZGxRoZh3EtTauaTHg5xQ",
    authDomain: "proyectodampnh.firebaseapp.com",
    databaseURL: "https://proyectodampnh-default-rtdb.firebaseio.com",
    projectId: "proyectodampnh",
    storageBucket: "proyectodampnh.appspot.com",
    messagingSenderId: "203692373929",
    appId: "1:203692373929:web:a96c1b737e15d9373eb6b8",
    measurementId: "G-BK2WSHGSMG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = initializeFirestore(app, { experimentalForceLongPolling: true });