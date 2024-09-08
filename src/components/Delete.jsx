// // src/components/Delete.js
// import React, { useEffect } from 'react';
// import axios from 'axios';
// import { useParams, useHistory } from 'react-router-dom';
// import Swal from 'sweetalert2';

// const Delete = () => {
//   const { id } = useParams();
//   const history = useHistory();

//   useEffect(() => {
//     const deleteProduct = async () => {
//       const token = localStorage.getItem('token');
//       try {
//         await axios.delete(`https://hotel.aotrek.net/api/auth/delete/${id}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         Swal.fire('Deleted', 'Product has been deleted', 'success');
//         history.push('/manage');
//       } catch (error) {
//         Swal.fire('Error', 'Failed to delete product', 'error');
//       }
//     };
//     deleteProduct();
//   }, [id, history]);

//   return <div>Deleting...</div>;
// };

// export default Delete;
// src/components/Delete.js
import React, { useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Delete = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Replaces useHistory

  useEffect(() => {
    const deleteProduct = async () => {
      const token = localStorage.getItem('token');
      try {
        await axios.delete(`https://hotel.aotrek.net/api/auth/delete/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        Swal.fire('Deleted', 'Product has been deleted', 'success');
        navigate('/manage'); // Replaces history.push
      } catch (error) {
        Swal.fire('Error', 'Failed to delete product', 'error');
      }
    };
    deleteProduct();
  }, [id, navigate]);

  return <div>Deleting...</div>;
};

export default Delete;
