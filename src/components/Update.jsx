// src/components/Update.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';

const Update = () => {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `https://hotel.aotrek.net/api/auth/manage/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const product = response.data;
      setName(product.name);
      setTitle(product.title);
      setDescription(product.description);
    };
    fetchProduct();
  }, [id]);

  const handleSubmit = async e => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.put(
        `https://hotel.aotrek.net/api/auth/update/${id}`,
        { name, title, description },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      Swal.fire('Success', 'Product updated successfully', 'success');
    } catch (error) {
      Swal.fire('Error', 'Failed to update product', 'error');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <button type="submit">Update Product</button>
      </form>
    </div>
  );
};

export default Update;
