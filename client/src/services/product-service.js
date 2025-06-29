import axios from 'axios';
import config from '../../config';

// URL base de la API desde la configuración
const API_BASE_URL = config.apiUrl;

/**
 * Servicio para manejar operaciones relacionadas con productos
 * Proporciona métodos para interactuar con la API de productos
 */
export const productService = {
  /**
   * Obtiene todos los productos disponibles
   * Recupera la lista completa de productos del servidor
   * @returns {Promise<Object>} Lista de productos disponibles
   */
  async getAll() {
    const response = await axios.get(`${API_BASE_URL}/products`,{
      headers: {
        'Authorization': `JWT ${localStorage.getItem('token')}`
      }
    });
    return response.data;
  },
}; 