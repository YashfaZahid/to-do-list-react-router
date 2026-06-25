// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBfiepJXMfA6GA9ZgOmVk_a5ddN9QtsfNU",
  authDomain: "to-do-app-2ceb7.firebaseapp.com",
  projectId: "to-do-app-2ceb7",
  storageBucket: "to-do-app-2ceb7.firebasestorage.app",
  messagingSenderId: "49847791047",
  appId: "1:49847791047:web:5b90220fde5962dd953de2",
  measurementId: "G-QB9VJ9YDP7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)