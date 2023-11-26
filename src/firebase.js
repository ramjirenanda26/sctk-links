// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAFTd4JQTIg7fPVB8uASWsBZH_raY_sIn0",
  authDomain: "auth-sctklinks.firebaseapp.com",
  projectId: "auth-sctklinks",
  storageBucket: "auth-sctklinks.appspot.com",
  messagingSenderId: "274483228456",
  appId: "1:274483228456:web:76a045ead91a34b31bea1d",
  measurementId: "G-RF62NN9847",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
