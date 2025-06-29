import axios from 'axios';
import config from '../../config';

// URL base de la API desde la configuración
const API_BASE_URL = config.apiUrl;

/**
 * Registra un nuevo usuario en el sistema
 * Envía los datos del usuario al endpoint de registro
 * @param {Object} userData - Datos del usuario (username, password)
 * @returns {Promise<Object>} Respuesta del servidor con datos del usuario registrado
 */
export async function register(userData) {
  const response = await axios.post(`${API_BASE_URL}/users`, userData);
  return response.data;
}

/**
 * Autentica un usuario existente
 * Envía credenciales al endpoint de login y maneja la respuesta
 * Guarda el token y datos del usuario en localStorage
 * Dispara evento para notificar cambios de autenticación
 * @param {Object} credentials - Credenciales del usuario (username, password)
 * @returns {Promise<Object>} Respuesta del servidor con token y datos del usuario
 */
export async function login(credentials) {
  const response = await axios.post(`${API_BASE_URL}/auth/login`, credentials);
  
  // Guarda el token de autenticación
  localStorage.setItem('token', response.data.token);
  
  // Guarda los datos del usuario
  localStorage.setItem('user', JSON.stringify(response.data.user));
  
  // Notifica cambios de autenticación a otros componentes
  window.dispatchEvent(new Event('authChange'));
  
  return response.data;
}

/**
 * Cierra la sesión del usuario actual
 * Elimina token y datos del usuario de localStorage
 * Notifica cambios de autenticación
 * Redirige al usuario a la página de login
 */
export function logout() {
  // Elimina el token de autenticación
  localStorage.removeItem('token');
  
  // Elimina los datos del usuario
  localStorage.removeItem('user');
  
  // Notifica cambios de autenticación a otros componentes
  window.dispatchEvent(new Event('authChange'));
  
  // Redirige al usuario a la página de login
  window.location.href = '/auth/login';
}