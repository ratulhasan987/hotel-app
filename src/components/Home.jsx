// src/components/Home.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleManageProducts = () => {
    navigate('/manage'); // Redirect to manage products page
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white text-center p-6">
        <h1 className="text-6xl font-bold mb-6">
          Welcome to My Product Manager
        </h1>
        <p className="text-lg mb-8 max-w-2xl">
          Manage your products with ease. Create, update, and delete your
          products using our simple and intuitive interface.
        </p>
        <button
          onClick={handleManageProducts}
          className="bg-white text-blue-500 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition duration-300"
        >
         Click to Manage Products
        </button>
      </section>

      {/* Features Section */}
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Core Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-4">Create Products</h3>
              <p>
                Easily add new products to your inventory with a simple form.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-4">Manage Products</h3>
              <p>View and manage your products from one central location.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-4">Update & Delete</h3>
              <p>
                Keep your product data up-to-date and remove items when needed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Product Overview Section */}
      <section className="py-12">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Products Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Example Products */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-4">Product 1</h3>
              <p>Brief description of Product 1.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-4">Product 2</h3>
              <p>Brief description of Product 2.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-4">Product 3</h3>
              <p>Brief description of Product 3.</p>
            </div>
          </div>
          <button
            onClick={handleManageProducts}
            className="mt-8 bg-blue-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-600 transition duration-300"
          >
            View All Products
          </button>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 My Product Manager. All rights reserved.</p>
          <div className="flex justify-center space-x-6 mt-4">
            <a href="/about" className="hover:underline">
              About Us
            </a>
            <a href="/contact" className="hover:underline">
              Contact
            </a>
            <a href="/terms" className="hover:underline">
              Terms of Service
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
