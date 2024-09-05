import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Registration from './Registration';
import Login from './Login';

const Auth = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate(); // Initialize navigate

  const handleRegistrationSuccess = () => {
    setIsRegistered(true);
    navigate('/login'); // Navigate to login page after registration
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    navigate('/home'); // Navigate to home page after login
  };

  return (
    <div className="auth-container">
      {isLoggedIn ? (
        <div>
          <h1>Redirecting to Home...</h1> {/* Optional placeholder text */}
        </div>
      ) : !isRegistered ? (
        <Registration onRegisterSuccess={handleRegistrationSuccess} />
      ) : (
        <Login onLoginSuccess={handleLoginSuccess} />
      )}
    </div>
  );
};

export default Auth;
