// src/components/Create.js
import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const Create = () => {
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.post(
        'https://hotel.aotrek.net/api/auth/create',
        { name, title, description },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      Swal.fire('Success', 'Product created successfully', 'success');
    } catch (error) {
      Swal.fire('Error', 'Failed to create product', 'error');
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
        <button type="submit">Create Product</button>
      </form>
    </div>
  );
};

export default Create;
