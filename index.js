import { auth } from "./firebaseConfig.js";
import { 
  signInWithEmailAndPassword, 
  signOut,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.querySelector('form');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');

  // Handle form submission
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent default form submission
    
    const email = emailInput.value.trim();
    const password = passwordInput.value;

    // Validate inputs
    if (!email || !password) {
      alert('Please enter both email and password');
      return;
    }

    try {
      // Sign in user
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('User logged in:', userCredential.user);
      alert('Login successful!');
      
      // Redirect to welcome page
      window.location.href = '/welcome.html';
      
    } catch (error) {
      console.error('Login error:', error);
      
      // User-friendly error messages
      let errorMessage = 'Login failed. ';
      switch (error.code) {
        case 'auth/invalid-email':
          errorMessage += 'Invalid email address.';
          break;
        case 'auth/user-disabled':
          errorMessage += 'This account has been disabled.';
          break;
        case 'auth/user-not-found':
          errorMessage += 'No account found with this email.';
          break;
        case 'auth/wrong-password':
          errorMessage += 'Incorrect password.';
          break;
        case 'auth/invalid-credential':
          errorMessage += 'Invalid credentials. Please check your email and password.';
          break;
        default:
          errorMessage += error.message;
      }
      
      alert(errorMessage);
    }
  });

  // Google Sign-In (if you have a Google sign-in button)
  const googleSignInBtn = document.querySelector('button[type="submit"]:nth-of-type(2)');
  if (googleSignInBtn) {
    googleSignInBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      
      try {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        console.log('Google sign-in successful:', result.user);
        alert('Google sign-in successful!');
        window.location.href = '/welcome.html';
      } catch (error) {
        console.error('Google sign-in error:', error);
        alert('Google sign-in failed: ' + error.message);
      }
    });
  }
});