import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

const client = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

client.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = async (username: string, password: string) => {
  const response = await client.post('/login', { username, password });
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
  }
  return response.data;
};

export const register = async (username: string, password: string, email: string) => {
  const response = await client.post('/register', { username, password, email });
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
  }
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

export const fetchContent = async () => {
  const response = await client.get('/content');
  return response.data;
};

export const updateContent = async (key: string, value: string, type: string = 'text') => {
  const response = await client.post('/content', { key, value, type });
  return response.data;
};

export const fetchLogs = async () => {
  const response = await client.get('/logs');
  return response.data;
};

export default client;
