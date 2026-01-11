// Firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBCPgwXG8lUwDQJFBiqabKoKwfrNAdhaAo",
  authDomain: "to-do-app-rahman.firebaseapp.com",
  projectId: "to-do-app-rahman",
  storageBucket: "to-do-app-rahman.appspot.com",
  messagingSenderId: "454835312426",
  appId: "1:454835312426:web:935acaec1b6578fede3053"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

 