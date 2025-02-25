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
  // Verificar se estamos no ambiente do navegador
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      
      // Adicionar o ID do usuário no cabeçalho X-User-ID
      const userStr = localStorage.getItem('user');
      if (userStr) {
        try {
          const user = JSON.parse(userStr);
          if (user && user.usuario_id) {
            config.headers['X-User-ID'] = user.usuario_id;
          }
        } catch (error) {
          console.error('Erro ao parsear dados do usuário:', error);
        }
      }
    }
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
      // Se estamos no navegador e recebemos um erro 401, podemos redirecionar para a página de login
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/auth/login';
      }
      throw new Error(error.response.data.message || 'Credenciais inválidas');
    }

    if (error.response) {
      throw new Error(error.response.data.message || 'Erro ao processar a requisição');
    }
    
    throw error;
  }
); 