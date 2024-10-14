import axios from 'axios';

const API_URL = 'https://markdown-server-app.vercel.app';

export const fetchAllDocuments = async () => {
  try {
    const response = await axios.get(`${API_URL}/documents`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar documentos:', error);
    return [];
  }
};

export const fetchDocument = async (uuid) => {
  try {
    const response = await axios.get(`${API_URL}/documents/${uuid}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar documento:', error);
    return null;
  }
};

export const saveDocument = async (uuid, data) => {
  try {
    await axios.post(`${API_URL}/documents/`, data);
  } catch (error) {
    console.error('Erro ao salvar documento:', error);
  }
};
