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
      console.error('Erro de conexão com o servidor:', error);
      throw new Error('Não foi possível conectar ao servidor. Verifique sua conexão ou se o servidor está online.');
    }
    
    if (error.response?.status === 401) {
      console.error('Erro de autenticação:', error.response.data);
      throw new Error('Credenciais inválidas. Verifique seu usuário e senha.');
    }

    if (error.response) {
      console.error('Erro na resposta do servidor:', error.response.data);
      throw new Error(error.response.data.message || 'Erro ao processar a requisição');
    }
    
    throw error;
  }
); 