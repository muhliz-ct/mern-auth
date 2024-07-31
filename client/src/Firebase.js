// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ,
  authDomain: "mern-auth-21c3a.firebaseapp.com",
  projectId: "mern-auth-21c3a",
  storageBucket: "mern-auth-21c3a.appspot.com",
  messagingSenderId: "515814532380",
  appId: "1:515814532380:web:df24609ab973e14dd786d9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);