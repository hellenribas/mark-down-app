import axios from 'axios';

const API_URL = 'https://mark-down-app-mu.vercel.app/api/auth';

export const loginUser = async ({ email, password }) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    // Armazenar token no localStorage ou contexto global
    localStorage.setItem('token', response.data.token);
    return { success: true };
  } catch (error) {
    return { success: false, message: error.response.data.message };
  }
};
