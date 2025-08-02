

import axios from 'axios';

// Set baseURL based on environment
const baseURL = import.meta.env.VITE_API_BASE_URL || '/api';
console.log('VITE_API_BASE_URL:', import.meta.env.VITE_API_BASE_URL);

const api = axios.create({
  baseURL,
  withCredentials: true, // send cookies
});

export default api;
