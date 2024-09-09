import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const api = axios.create({
  baseURL: 'https://hotel.aotrek.net/api',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editProductId, setEditProductId] = useState(null);
  const [editProductData, setEditProductData] = useState({});
  const [newProduct, setNewProduct] = useState({
    name: '',
    title: '',
    description: '',
  }); // State for new product
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/auth/manage');
        if (response.data.success) {
          setProducts(response.data.categories || []);
        } else {
          console.error('Failed to fetch products:', response.data.message);
          setProducts([]);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        if (error.response && error.response.status === 401) {
          navigate('/login');
        }
        setLoading(false);
      }
    };

    fetchProducts();
  }, [navigate]);

  //handle delete start
  const handleDelete = async id => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then(async result => {
      if (result.isConfirmed) {
        try {
          await api.delete(`/auth/delete/${id}`);
          setProducts(products.filter(product => product.id !== id));
          Swal.fire('Deleted!', 'The product has been deleted.', 'success');
        } catch (error) {
          console.error('Error deleting product:', error);
          Swal.fire(
            'Error!',
            'There was a problem deleting the product.',
            'error'
          );
        }
      }
    });
  };
  //handle delete end

  //handle edit start
  const handleEditClick = product => {
    setEditProductId(product.id);
    setEditProductData({ ...product });
  };

  const handleEditChange = e => {
    const { name, value } = e.target;
    setEditProductData({ ...editProductData, [name]: value });
  };

  const handleEditSave = async id => {
    try {
      const response = await api.put(`/auth/update/${id}`, editProductData);
      if (response.data.success) {
        setProducts(
          products.map(product =>
            product.id === id ? response.data.product : product
          )
        );
        Swal.fire('Updated!', 'The product has been updated.', 'success');
        setEditProductId(null);
      } else {
        Swal.fire(
          response.data.message || 'There was a problem updating the product.'
        );
      }
    } catch (error) {
      console.error('Error updating product:', error);
      Swal.fire(
        'Error!',
        error.response?.data?.message ||
          'There was a problem updating the product.',
        'error'
      );
    }
  };

  const handleEditCancel = () => {
    setEditProductId(null);
  };
  //handle edit end

  const handleCreateChange = e => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  //handle create start
  const handleCreateSubmit = async e => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/create', newProduct);
      if (response.data.success) {
        setProducts([...products, response.data.product]);
        setNewProduct({ name: '', title: '', description: '' }); // Clear the form
        Swal.fire('Created!', 'The product has been created.', 'success');
      } else {
        Swal.fire(
          response.data.message || 'There was a problem creating the product.'
        );
      }
    } catch (error) {
      console.error('Error creating product:', error);
      Swal.fire(
        'Error!',
        error.response?.data?.message ||
          'There was a problem creating the product.',
        'error'
      );
    }
  };
  //handle create end

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Manage Products</h1>

      {/* Create New Product Form */}
      <form
        onSubmit={handleCreateSubmit}
        className="mb-6 bg-gray-100 p-4 rounded shadow"
      >
        <h2 className="text-2xl font-bold mb-6">Create New Product</h2>
        <div className="flex flex-col md:flex-row md:flex-wrap gap-4">
          <div className="md:flex-1">
            <label className="block text-gray-700 mb-0">Name</label>
            <input
              type="text"
              name="name"
              value={newProduct.name}
              onChange={handleCreateChange}
              className="border p-2 rounded w-full"
              required
            />
          </div>
          <div className="md:flex-1">
            <label className="block text-gray-700 mb-0">Title</label>
            <input
              type="text"
              name="title"
              value={newProduct.title}
              onChange={handleCreateChange}
              className="border p-2 rounded w-full"
              required
            />
          </div>
          <div className="md:flex-1 w-full">
            <label className="block text-gray-700 mb-0">Description</label>
            <textarea
              type="text"
              name="description"
              value={newProduct.description}
              onChange={handleCreateChange}
              className="border p-2 rounded w-full h-11 "
              required
            />
          </div>
          <div className="md:w-40 flex-shrink-0">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 w-full md:mt-6"
            >
              Create Product
            </button>
          </div>
        </div>
      </form>

      {loading ? (
        <div className="flex justify-center items-center">
          <div className="spinner-border text-blue-500" />
          <p className="ml-4 text-lg font-semibold">Loading products...</p>
        </div>
      ) : (
        <table className="min-w-full bg-white border border-gray-200 shadow-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Title</th>
              <th className="py-2 px-4 border-b">Description</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan="4" className="py-4 px-4 text-center">
                  No products found.
                </td>
              </tr>
            ) : (
              products.map(product => (
                <tr key={product.id} className="hover:bg-gray-50 text-center">
                  {editProductId === product.id ? (
                    <>
                      <td className="py-2 px-4 border-b">
                        <input
                          type="text"
                          name="name"
                          value={editProductData.name}
                          onChange={handleEditChange}
                          className="border p-2 rounded w-full"
                        />
                      </td>
                      <td className="py-2 px-4 border-b">
                        <input
                          type="text"
                          name="title"
                          value={editProductData.title}
                          onChange={handleEditChange}
                          className="border p-2 rounded w-full"
                        />
                      </td>
                      <td className="py-2 px-4 border-b">
                        <textarea
                          name="description"
                          value={editProductData.description}
                          onChange={handleEditChange}
                          className="border p-2 rounded w-full h-10 mt-1.5"
                        />
                      </td>
                      <td className="py-3 px-4 border-b flex space-x-2 mt-2">
                        <button
                          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
                          onClick={() => handleEditSave(product.id)}
                        >
                          Save
                        </button>
                        <button
                          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
                          onClick={handleEditCancel}
                        >
                          Cancel
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="py-2 px-4 border-b">{product.name}</td>
                      <td className="py-2 px-4 border-b">{product.title}</td>
                      <td className="py-2 px-4 border-b">
                        {product.description}
                      </td>
                      <td className="py-2 px-4 border-b items-center justify-center flex space-x-2">
                        <button
                          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-700"
                          onClick={() => handleEditClick(product)}
                        >
                          Edit
                        </button>
                        <button
                          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                          onClick={() => handleDelete(product.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManageProducts;
