import axios from 'axios';
import config from '../../config';

const API_BASE_URL = config.apiUrl;

export const productService = {
  async getAll() {
    const response = await axios.get(`${API_BASE_URL}/products`,{
      headers: {
        'Authorization': `JWT ${localStorage.getItem('token')}`
      }
    });
    return response.data;
  },
}; 