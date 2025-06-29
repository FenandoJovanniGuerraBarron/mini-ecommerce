import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

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