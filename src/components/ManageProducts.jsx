// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import Swal from 'sweetalert2';

// // const ManageProducts = () => {
// //   const [products, setProducts] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     const fetchProducts = async () => {
// //       try {
// //         const token = localStorage.getItem('token'); // Retrieve the stored token

// //         if (!token) {
// //           // Redirect to login if token is not found
// //           window.location.href = '/login';
// //           return;
// //         }

// //         const response = await axios.get(
// //           'https://hotel.aotrek.net/api/auth/manage',
// //           {
// //             headers: {
// //               Authorization: `Bearer ${token}`,
// //             },
// //           }
// //         );

// //         setProducts(response.data); // Update products state with fetched data
// //         setLoading(false);
// //       } catch (error) {
// //         console.error('Error fetching products:', error);
// //         setLoading(false);
// //       }
// //     };

// //     fetchProducts();
// //   }, []);

// //   const handleDelete = async id => {
// //     Swal.fire({
// //       title: 'Are you sure?',
// //       text: "You won't be able to revert this!",
// //       icon: 'warning',
// //       showCancelButton: true,
// //       confirmButtonColor: '#d33',
// //       cancelButtonColor: '#3085d6',
// //       confirmButtonText: 'Yes, delete it!',
// //     }).then(async result => {
// //       if (result.isConfirmed) {
// //         try {
// //           const token = localStorage.getItem('token'); // Retrieve the stored token
// //           await axios.delete(`https://hotel.aotrek.net/api/auth/delete/${id}`, {
// //             headers: {
// //               Authorization: `Bearer ${token}`,
// //             },
// //           });

// //           // Remove the deleted product from the state
// //           setProducts(products.filter(product => product._id !== id));

// //           Swal.fire('Deleted!', 'The product has been deleted.', 'success');
// //         } catch (error) {
// //           console.error('Error deleting product:', error);
// //           Swal.fire(
// //             'Error!',
// //             'There was a problem deleting the product.',
// //             'error'
// //           );
// //         }
// //       }
// //     });
// //   };

// //   return (
// //     <div className="container mx-auto p-6">
// //       <h1 className="text-3xl font-bold mb-6">Manage Products</h1>
// //       {loading ? (
// //         <p>Loading products...</p>
// //       ) : (
// //         <table className="min-w-full bg-white border border-gray-200">
// //           <thead>
// //             <tr>
// //               <th className="py-2 px-4 border-b">Name</th>
// //               <th className="py-2 px-4 border-b">Title</th>
// //               <th className="py-2 px-4 border-b">Description</th>
// //               <th className="py-2 px-4 border-b">Actions</th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {products.length === 0 ? (
// //               <tr>
// //                 <td colSpan="4" className="py-4 px-4 text-center">
// //                   No products found.
// //                 </td>
// //               </tr>
// //             ) : (
// //               products.map(product => (
// //                 <tr key={product._id}>
// //                   <td className="py-2 px-4 border-b">{product.name}</td>
// //                   <td className="py-2 px-4 border-b">{product.title}</td>
// //                   <td className="py-2 px-4 border-b">{product.description}</td>
// //                   <td className="py-2 px-4 border-b">
// //                     <button
// //                       className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
// //                       onClick={() => handleDelete(product._id)}
// //                     >
// //                       Delete
// //                     </button>
// //                   </td>
// //                 </tr>
// //               ))
// //             )}
// //           </tbody>
// //         </table>
// //       )}
// //     </div>
// //   );
// // };

// // export default ManageProducts;
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import { useNavigate } from 'react-router-dom';

// // Create an Axios instance with default settings
// const api = axios.create({
//   baseURL: 'https://hotel.aotrek.net/api',
//   headers: {
//     Authorization: `Bearer ${localStorage.getItem('token')}`, // Add token here
//   },
// });

// const ManageProducts = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate(); // For redirection

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await api.get('/auth/manage');
//         console.log('API Response:', response.data); // Log the response data
//         if (response.data.success) {
//           setProducts(response.data.categories || []); // Extract and set the categories array
//         } else {
//           console.error('Failed to fetch products:', response.data.message);
//           setProducts([]); // Ensure products is an array
//         }
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching products:', error);
//         if (error.response && error.response.status === 401) {
//           navigate('/login'); // Redirect to login
//         }
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, [navigate]);

//   const handleDelete = async id => {
//     Swal.fire({
//       title: 'Are you sure?',
//       text: "You won't be able to revert this!",
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#d33',
//       cancelButtonColor: '#3085d6',
//       confirmButtonText: 'Yes, delete it!',
//     }).then(async result => {
//       if (result.isConfirmed) {
//         try {
//           await api.delete(`/auth/delete/${id}`);
//           setProducts(products.filter(product => product.id !== id));
//           Swal.fire('Deleted!', 'The product has been deleted.', 'success');
//         } catch (error) {
//           console.error('Error deleting product:', error);
//           Swal.fire(
//             'Error!',
//             'There was a problem deleting the product.',
//             'error'
//           );
//         }
//       }
//     });
//   };

//   return (
//     <div className="container mx-auto p-6">
//       <h1 className="text-3xl font-bold mb-6">Manage Products</h1>
//       {loading ? (
//         <p>Loading products...</p>
//       ) : (
//         <table className="min-w-full bg-white border border-gray-200">
//           <thead>
//             <tr>
//               <th className="py-2 px-4 border-b">Name</th>
//               <th className="py-2 px-4 border-b">Title</th>
//               <th className="py-2 px-4 border-b">Description</th>
//               <th className="py-2 px-4 border-b">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {products.length === 0 ? (
//               <tr>
//                 <td colSpan="4" className="py-4 px-4 text-center">
//                   No products found.
//                 </td>
//               </tr>
//             ) : (
//               products.map(product => (
//                 <tr key={product.id}>
//                   <td className="py-2 px-4 border-b">{product.name}</td>
//                   <td className="py-2 px-4 border-b">{product.title}</td>
//                   <td className="py-2 px-4 border-b">{product.description}</td>
//                   <td className="py-2 px-4 border-b">
//                     <button
//                       className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
//                       onClick={() => handleDelete(product.id)}
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default ManageProducts;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

// Create an Axios instance with default settings
const api = axios.create({
  baseURL: 'https://hotel.aotrek.net/api',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`, // Add token here
  },
});

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: '',
    title: '',
    description: '',
  });
  const navigate = useNavigate(); // For redirection

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/auth/manage');
        console.log('API Response:', response.data); // Log the response data
        if (response.data.success) {
          setProducts(response.data.categories || []); // Extract and set the categories array
        } else {
          console.error('Failed to fetch products:', response.data.message);
          setProducts([]); // Ensure products is an array
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        if (error.response && error.response.status === 401) {
          navigate('/login'); // Redirect to login
        }
        setLoading(false);
      }
    };

    fetchProducts();
  }, [navigate]);

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

  const handleCreate = async () => {
    try {
      const response = await api.post('/auth/create', newProduct);
      if (response.data.success) {
        setProducts([...products, response.data.product]);
        Swal.fire('Created!', 'The product has been created.', 'success');
        setNewProduct({ name: '', title: '', description: '' }); // Clear form
      } else {
        Swal.fire(
          'Error!',
          'There was a problem creating the product.',
          'error'
        );
      }
    } catch (error) {
      console.error('Error creating product:', error);
      Swal.fire('Error!', 'There was a problem creating the product.', 'error');
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await api.put(
        `/auth/update/${editProduct.id}`,
        editProduct
      );
      if (response.data.success) {
        setProducts(
          products.map(product =>
            product.id === editProduct.id ? response.data.product : product
          )
        );
        Swal.fire('Updated!', 'The product has been updated.', 'success');
        setIsEditing(false);
        setEditProduct(null);
      } else {
        Swal.fire(
          'Error!',
          'There was a problem updating the product.',
          'error'
        );
      }
    } catch (error) {
      console.error('Error updating product:', error);
      Swal.fire('Error!', 'There was a problem updating the product.', 'error');
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Manage Products</h1>

      {/* Create Product Form */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Create Product</h2>
        <input
          type="text"
          placeholder="Name"
          value={newProduct.name}
          onChange={e => setNewProduct({ ...newProduct, name: e.target.value })}
          className="border p-2 rounded mb-2 w-full"
        />
        <input
          type="text"
          placeholder="Title"
          value={newProduct.title}
          onChange={e =>
            setNewProduct({ ...newProduct, title: e.target.value })
          }
          className="border p-2 rounded mb-2 w-full"
        />
        <textarea
          placeholder="Description"
          value={newProduct.description}
          onChange={e =>
            setNewProduct({ ...newProduct, description: e.target.value })
          }
          className="border p-2 rounded mb-4 w-full"
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={handleCreate}
        >
          Create Product
        </button>
      </div>

      {/* Update Product Form */}
      {isEditing && editProduct && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Update Product</h2>
          <input
            type="text"
            placeholder="Name"
            value={editProduct.name}
            onChange={e =>
              setEditProduct({ ...editProduct, name: e.target.value })
            }
            className="border p-2 rounded mb-2 w-full"
          />
          <input
            type="text"
            placeholder="Title"
            value={editProduct.title}
            onChange={e =>
              setEditProduct({ ...editProduct, title: e.target.value })
            }
            className="border p-2 rounded mb-2 w-full"
          />
          <textarea
            placeholder="Description"
            value={editProduct.description}
            onChange={e =>
              setEditProduct({ ...editProduct, description: e.target.value })
            }
            className="border p-2 rounded mb-4 w-full"
          />
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
            onClick={handleUpdate}
          >
            Update Product
          </button>
        </div>
      )}

      {loading ? (
        <p>Loading products...</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
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
                <tr key={product.id}>
                  <td className="py-2 px-4 border-b">{product.name}</td>
                  <td className="py-2 px-4 border-b">{product.title}</td>
                  <td className="py-2 px-4 border-b">{product.description}</td>
                  <td className="py-2 px-4 border-b">
                    <button
                      className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-700 mr-2"
                      onClick={() => {
                        setIsEditing(true);
                        setEditProduct(product);
                      }}
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
