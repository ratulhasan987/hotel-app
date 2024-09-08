import axios from 'axios';

// Create an Axios instance
const api = axios.create({
  baseURL: 'https://hotel.aotrek.net/api/',
});

// Add a request interceptor
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);


export default api;
