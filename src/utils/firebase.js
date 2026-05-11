// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCuBZLqI6dqMrE8b__AXUfz7Y9X8hAT2bw",
  authDomain: "aiflex-witcher92k.firebaseapp.com",
  projectId: "aiflex-witcher92k",
  storageBucket: "aiflex-witcher92k.firebasestorage.app",
  messagingSenderId: "535197790602",
  appId: "1:535197790602:web:6ba997744d0ecbd9f39873",
  measurementId: "G-92650Y60BT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


export const auth = getAuth(app);