import axios from 'axios';
import config from '../../config';

const API_BASE_URL = config.apiUrl;

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

export async function getCart() {
  const response = await axios.get(`${API_BASE_URL}/cart`, {
    headers: {
      'Authorization': `JWT ${localStorage.getItem('token')}`,
    },
  });
  return response.data;
}

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

export async function clearCart() {
  const response = await axios.delete(`${API_BASE_URL}/cart`, {
    headers: {
      'Authorization': `JWT ${localStorage.getItem('token')}`,
    },
  });
  return response.data;
}

export async function removeFromCart(productId) {
  const response = await axios.delete(`${API_BASE_URL}/cart/remove`, {
    data: { productId: String(productId) },
    headers: {
      'Authorization': `JWT ${localStorage.getItem('token')}`,
    },
  });
  return response.data;
}

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