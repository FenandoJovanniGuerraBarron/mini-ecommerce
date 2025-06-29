import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

export async function register(userData) {
  const response = await axios.post(`${API_BASE_URL}/users`, userData);
  return response.data;
}

export async function login(credentials) {
  const response = await axios.post(`${API_BASE_URL}/auth/login`, credentials);
  localStorage.setItem('token', response.data.token);
  localStorage.setItem('user', JSON.stringify(response.data.user));
  window.dispatchEvent(new Event('authChange'));
  return response.data;
}

export function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.dispatchEvent(new Event('authChange'));
  window.location.href = '/auth/login';
}