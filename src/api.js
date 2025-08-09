

import axios from 'axios';

// Set baseURL based on environment
const baseURL = import.meta.env.VITE_API_BASE_URL || '/api';


const api = axios.create({
  baseURL,
  withCredentials: true, // send cookies
});

export default api;
