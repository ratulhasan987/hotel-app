// src/components/Manage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Manage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        'https://hotel.aotrek.net/api/auth/manage',
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setProducts(response.data);
    };
    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Manage Products</h1>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            {product.name} - {product.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Manage;
