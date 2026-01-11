import { auth } from "./Firebase.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// Ensure your form in HTML has id="signupForm"
const signupForm = document.querySelector("form"); 

signupForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Make sure these IDs match your HTML exactly
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  // If you have a confirm password field:
  const confirmPass = document.getElementById("confirm") ? document.getElementById("confirm").value : password;

  if (password !== confirmPass) {
    alert("Passwords do not match!");
    return;
  }

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      alert("Account created successfully ✅");
      // Redirect to Login or Main Page
      window.location.href = "index.html"; 
    })
    .catch((error) => {
      alert("Error: " + error.message);
    });
});