import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

// Add a request interceptor to attach the JWT token
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('rahima_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add a response interceptor to handle errors globally
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('rahima_token');
      // window.location.href = '/login'; // Redirect to login if unauthorized
    }
    return Promise.reject(error);
  }
);

export default API;
