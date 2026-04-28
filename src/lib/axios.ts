import axios from 'axios';

const TOKEN_KEY = 'diflen-hub-token';
const USERNAME_KEY = 'diflen-hub-username';

const api = axios.create({
  baseURL: 'https://diflen-hub-api-latest.onrender.com/',
});

api.interceptors.request.use((config) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem(TOKEN_KEY) : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (typeof window !== 'undefined' && error?.response?.status === 401) {
      const onAuthRoute =
        window.location.pathname === '/login' ||
        window.location.pathname === '/register';
      if (!onAuthRoute) {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USERNAME_KEY);
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  },
);

export default api;
