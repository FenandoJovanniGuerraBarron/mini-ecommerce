import axios from 'axios';
import config from '../../config';

// URL base de la API desde la configuración
const API_BASE_URL = config.apiUrl;

/**
 * Agrega un producto al carrito del usuario
 * Envía el ID del producto y la cantidad al endpoint de agregar al carrito
 * @param {number} productId - ID del producto a agregar
 * @param {number} quantity - Cantidad del producto (por defecto 1)
 * @returns {Promise<Object>} Respuesta del servidor
 */
export async function addToCart(productId, quantity = 1) {
  const response = await axios.post(
    `${API_BASE_URL}/cart/add`,
    {
      productId: String(productId),
      quantity: String(quantity),
    },
    {
      headers: {
        'Authorization': `JWT ${localStorage.getItem('token')}`,
      },
    }
  );
  return response.data;
}

/**
 * Obtiene el contenido actual del carrito del usuario
 * Recupera todos los productos y cantidades del carrito
 * @returns {Promise<Object>} Datos del carrito con productos y cantidades
 */
export async function getCart() {
  const response = await axios.get(`${API_BASE_URL}/cart`, {
    headers: {
      'Authorization': `JWT ${localStorage.getItem('token')}`,
    },
  });
  return response.data;
}

/**
 * Procesa el checkout del carrito
 * Finaliza la compra y limpia el carrito
 * @returns {Promise<Object>} Respuesta del servidor con detalles de la compra
 */
export async function checkout() {
  const response = await axios.post(
    `${API_BASE_URL}/checkout`,
    {},
    {
      headers: {
        'Authorization': `JWT ${localStorage.getItem('token')}`,
      },
    }
  );
  return response.data;
}

/**
 * Vacía completamente el carrito del usuario
 * Elimina todos los productos del carrito
 * @returns {Promise<Object>} Respuesta del servidor
 */
export async function clearCart() {
  const response = await axios.delete(`${API_BASE_URL}/cart`, {
    headers: {
      'Authorization': `JWT ${localStorage.getItem('token')}`,
    },
  });
  return response.data;
}

/**
 * Elimina un producto específico del carrito
 * @param {number} productId - ID del producto a eliminar
 * @returns {Promise<Object>} Respuesta del servidor
 */
export async function removeFromCart(productId) {
  const response = await axios.delete(`${API_BASE_URL}/cart/remove`, {
    data: { productId: String(productId) },
    headers: {
      'Authorization': `JWT ${localStorage.getItem('token')}`,
    },
  });
  return response.data;
}

/**
 * Actualiza la cantidad de un producto en el carrito
 * Reduce la cantidad en 1 unidad
 * @param {number} productId - ID del producto a actualizar
 * @returns {Promise<Object>} Respuesta del servidor
 */
export async function updateCartQuantity(productId) {
  const response = await axios.patch(
    `${API_BASE_URL}/cart/update`,
    {
      productId: String(productId),
      quantity: 1,
    },
    {
      headers: {
        'Authorization': `JWT ${localStorage.getItem('token')}`,
      },
    }
  );
  return response.data;
} 