import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3001',
  timeout: 5000, // 5 segundos
  headers: {
    'Content-Type': 'application/json',
  },
  auth: {
    username: process.env.NEXT_PUBLIC_API_USER || '',
    password: process.env.NEXT_PUBLIC_API_PASSWORD || '',
  }
});

// Interceptor para adicionar token JWT
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para tratamento de erros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ERR_NETWORK') {
      throw new Error('Não foi possível conectar ao servidor. Verifique sua conexão ou se o servidor está online.');
    }
    
    if (error.response?.status === 401) {
      throw new Error(error.response.data.message || 'Credenciais inválidas');
    }

    if (error.response) {
      throw new Error(error.response.data.message || 'Erro ao processar a requisição');
    }
    
    throw error;
  }
); 