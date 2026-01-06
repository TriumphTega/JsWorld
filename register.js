import { auth } from "./firebaseConfig.js";
import { 
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
  const registerForm = document.querySelector('form');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');

  // Handle registration form submission
  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent default form submission
    
    const email = emailInput.value.trim();
    const password = passwordInput.value;

    // Validate inputs
    if (!email || !password) {
      alert('Please enter both email and password');
      return;
    }

    // Password validation
    if (password.length < 6) {
      alert('Password must be at least 6 characters long');
      return;
    }

    try {
      // Create new user
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('User registered:', userCredential.user);
      alert('Registration successful!');
      
      // Redirect to welcome page
      window.location.href = '/welcome.html';
      
    } catch (error) {
      console.error('Registration error:', error);
      
      // User-friendly error messages
      let errorMessage = 'Registration failed. ';
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage += 'An account with this email already exists.';
          break;
        case 'auth/invalid-email':
          errorMessage += 'Invalid email address.';
          break;
        case 'auth/operation-not-allowed':
          errorMessage += 'Email/password accounts are not enabled.';
          break;
        case 'auth/weak-password':
          errorMessage += 'Password is too weak. Use at least 6 characters.';
          break;
        default:
          errorMessage += error.message;
      }
      
      alert(errorMessage);
    }
  });

  // Google Sign-In
  const googleSignInBtn = document.getElementById('create');
  if (googleSignInBtn) {
    googleSignInBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      
      try {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        console.log('Google registration successful:', result.user);
        alert('Account created with Google!');
        window.location.href = '/welcome.html';
      } catch (error) {
        console.error('Google sign-in error:', error);
        alert('Google sign-in failed: ' + error.message);
      }
    });
  }
});