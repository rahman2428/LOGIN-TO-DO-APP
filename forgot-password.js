import { auth } from "./Firebase.js";
import { sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const forgotForm = document.getElementById("forgotForm");

forgotForm.addEventListener("submit", (e) => {
  e.preventDefault();
  
  // Ensure your HTML input has id="resetEmail" (or change this line to match your HTML ID)
  const emailInput = document.getElementById("resetEmail") || document.getElementById("identity");
  const email = emailInput.value;

  sendPasswordResetEmail(auth, email)
    .then(() => {
      alert("Password reset email sent 📧. Check your inbox (and spam folder).");
      window.location.href = "rahman-login.html";
    })
    .catch((error) => {
      console.error(error);
      alert("Error: " + error.message);
    });
});