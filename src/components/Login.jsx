
// export default Login;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Get the dispatch function from Redux

  // const handleSubmit = async e => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.post(
  //       'https://hotel.aotrek.net/api/auth/login',
  //       { email, password }
  //     );

  //     // Dispatch login action
  //     dispatch({ type: 'LOGIN_SUCCESS', payload: response.data.token });

  //     // Store token in localStorage
  //     localStorage.setItem('token', response.data.token);

  //     // Redirect to home page
  //     navigate('/home');
  //   } catch (error) {
  //     console.error('Login failed:', error);
  //     window.alert('Login failed. Please check your credentials.');
  //   }
  // };
  // In your Login component
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'https://hotel.aotrek.net/api/auth/login',
        { email, password }
      );
      console.log(response);
        console.log(response.data.user.token);
      localStorage.setItem('token', response.data.user.token);
      navigate('/home');
    } catch (error) {
      console.error('Login failed:', error);
      window.alert('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;


