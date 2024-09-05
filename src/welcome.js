// Welcome.js
import React from 'react';
import './Welcome.css'; // Import the CSS file for animations

const Welcome = () => {
  return (
    <div className="welcome-container">
      <div className="welcome-message">
        <h1 className="welcome-title">Welcome!</h1>
        <p className="welcome-text">You have successfully logged in.</p>
      </div>
    </div>
  );
};

export default Welcome;
