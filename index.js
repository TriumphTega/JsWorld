import { auth } from "./firebaseConfig.js";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

// Debug: Check if Firebase is initialized
console.log("🔥 Firebase Auth initialized:", auth);
console.log("🔥 App name:", auth.app.name);

// Wait for DOM to load
document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ DOM loaded");

  const loginForm = document.getElementById("loginForm");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const errorDiv = document.getElementById("errorMessage");
  const googleSignInBtn = document.getElementById("googleSignInBtn");

  // Show error message
  function showError(message) {
    console.error("❌ Error:", message);
    errorDiv.textContent = message;
    errorDiv.style.display = "block";
    alert(message); // Also show alert for visibility
  }

  // Hide error message
  function hideError() {
    errorDiv.style.display = "none";
  }

  // Handle email/password login
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log("📝 Form submitted");
    hideError();

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    console.log("📧 Email:", email);
    console.log("🔑 Password length:", password.length);

    if (!email || !password) {
      showError("Please enter both email and password");
      return;
    }

    try {
      console.log("🔐 Attempting sign in...");
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("✅ Login successful:", userCredential.user.email);

      alert("Login successful!");
      window.location.href = "/welcome.html";
    } catch (error) {
      console.error("❌ Login error:", error);
      console.error("Error code:", error.code);
      console.error("Error message:", error.message);

      let errorMessage = "Login failed: ";
      switch (error.code) {
        case "auth/invalid-email":
          errorMessage += "Invalid email address.";
          break;
        case "auth/user-disabled":
          errorMessage += "This account has been disabled.";
          break;
        case "auth/user-not-found":
          errorMessage += "No account found with this email.";
          break;
        case "auth/wrong-password":
          errorMessage += "Incorrect password.";
          break;
        case "auth/invalid-credential":
          errorMessage +=
            "Invalid credentials. Please check your email and password.";
          break;
        case "auth/network-request-failed":
          errorMessage += "Network error. Check your internet connection.";
          break;
        default:
          errorMessage += error.message;
      }

      showError(errorMessage);
    }
  });

  // Handle Google Sign-In
  if (googleSignInBtn) {
    googleSignInBtn.addEventListener("click", async (e) => {
      e.preventDefault();
      console.log("🔵 Google sign-in clicked");
      hideError();

      try {
        console.log("🔐 Creating Google provider...");
        const provider = new GoogleAuthProvider();

        console.log("🔐 Opening Google popup...");
        const result = await signInWithPopup(auth, provider);

        console.log("✅ Google sign-in successful:", result.user.email);
        alert("Google sign-in successful!");
        window.location.href = "/welcome.html";
      } catch (error) {
        console.error("❌ Google sign-in error:", error);
        console.error("Error code:", error.code);
        console.error("Error message:", error.message);

        let errorMessage = "Google sign-in failed: ";
        switch (error.code) {
          case "auth/popup-closed-by-user":
            errorMessage += "Sign-in popup was closed.";
            break;
          case "auth/popup-blocked":
            errorMessage += "Sign-in popup was blocked by browser.";
            break;
          case "auth/unauthorized-domain":
            errorMessage +=
              "This domain is not authorized. Add it in Firebase Console.";
            break;
          default:
            errorMessage += error.message;
        }

        showError(errorMessage);
      }
    });
  } else {
    console.error("❌ Google sign-in button not found!");
  }

  console.log("✅ Event listeners attached");
});
