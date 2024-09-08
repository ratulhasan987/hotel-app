import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import ManageProducts from './components/ManageProducts';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<ProtectedRoute element={<Home />} />} />
        <Route
          path="/manage"
          element={<ProtectedRoute element={<ManageProducts />} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
