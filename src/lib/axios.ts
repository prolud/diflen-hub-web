import axios from 'axios';

const api = axios.create({
  baseURL: 'http://diflenhub-api.runasp.net/',
});

api.interceptors.request.use((config) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('diflen-hub-token') : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
