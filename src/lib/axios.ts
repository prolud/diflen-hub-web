import axios from 'axios';

const api = axios.create({
  baseURL: 'https://localhost:7034/',
});

api.interceptors.request.use((config) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('diflen-hub-token') : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
