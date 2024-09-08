// src/components/LandingPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/login'); // Redirect to the login page or any other route
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <h1 className="text-5xl font-bold mb-6">Welcome to My App</h1>
      <p className="text-lg mb-8">
        Your one-stop solution for managing products and more. Login to get
        started!
      </p>
      <button
        onClick={handleGetStarted}
        className="bg-white text-blue-500 px-6 py-3 rounded-full font-semibold text-lg hover:bg-gray-100 transition duration-300"
      >
        Get Started
      </button>
    </div>
  );
};

export default LandingPage;
