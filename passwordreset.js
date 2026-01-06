import { auth } from "./firebaseConfig.js";
import { sendPasswordResetEmail } from "firebase/auth";

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
  const resetForm = document.querySelector('form');
  const emailInput = document.getElementById('email');

  // Handle password reset form submission
  resetForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent default form submission
    
    const email = emailInput.value.trim();

    // Validate email
    if (!email) {
      alert('Please enter your email address');
      return;
    }

    try {
      // Send password reset email
      await sendPasswordResetEmail(auth, email);
      
      alert('Password reset email sent! Check your inbox.');
      console.log('Password reset email sent to:', email);
      
      // Optional: Redirect to login page after 2 seconds
      setTimeout(() => {
        window.location.href = '/index.html';
      }, 2000);
      
    } catch (error) {
      console.error('Password reset error:', error);
      
      // User-friendly error messages
      let errorMessage = 'Failed to send reset email. ';
      switch (error.code) {
        case 'auth/invalid-email':
          errorMessage += 'Invalid email address.';
          break;
        case 'auth/user-not-found':
          errorMessage += 'No account found with this email.';
          break;
        default:
          errorMessage += error.message;
      }
      
      alert(errorMessage);
    }
  });
});