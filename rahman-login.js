import { auth } from "./Firebase.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", (e) => {
  // 1. STOP the form from reloading the page
  e.preventDefault();

  console.log("Login button clicked..."); // Debugging

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log("Login Successful!", userCredential.user);
      alert("Login Successful! Redirecting...");
      // 2. Redirect ONLY after success
      window.location.href = "index.html"; 
    })
    .catch((error) => {
      console.error(error);
      alert("Login Failed: " + error.message);
    });
});