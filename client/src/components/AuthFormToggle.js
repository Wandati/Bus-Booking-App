import React, { useState } from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation from react-router-dom
import LoginForm from './Login';
import SignUpForm from './Signup';

function AuthFormToggle() {
  const [showSignUp, setShowSignUp] = useState(true); // Initialize the state to show SignUp form
  const location = useLocation();

  // Conditionally render the toggle only on the sign-up page
  if (location.pathname !== '/signup') {
    return null; // Don't render the toggle on other pages
  }

  return (
    <div>
      <div>
        <label>
          <input
            type="radio"
            name="authType"
            value="signup"
            checked={showSignUp}
            onChange={() => setShowSignUp(true)}
          />
          Sign Up
        </label>
        <label>
          <input
            type="radio"
            name="authType"
            value="login"
            checked={!showSignUp}
            onChange={() => setShowSignUp(false)}
          />
          Log In
        </label>
      </div>
      {showSignUp ? <SignUpForm /> : <LoginForm />}
    </div>
  );
}

export default AuthFormToggle;
