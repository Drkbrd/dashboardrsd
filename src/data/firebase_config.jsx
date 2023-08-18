// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDe936UkZaZl7L8WcH0OrK4xH1yZ_y8YHQ",
  authDomain: "dashboardrsd.firebaseapp.com",
  projectId: "dashboardrsd",
  storageBucket: "dashboardrsd.appspot.com",
  messagingSenderId: "1083279746100",
  appId: "1:1083279746100:web:3ecbce91bdf15eb7101661"
};

// Initialize Firebase
export function initializeFirebase () { return initializeApp(firebaseConfig)};
export function db(){
    return getFirestore(initializeFirebase());
}


