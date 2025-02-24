import { api } from './api';
import { Usuario } from './types';

interface LoginData {
  email: string;
  senha: string;
}

interface CadastroData {
  nome: string;
  email: string;
  telefone?: string;
}

export const authService = {
  async login(data: LoginData) {
    const response = await api.post<{ token: string; user: Usuario }>('/auth/login', data);
    return response.data;
  },

  async cadastro(data: CadastroData) {
    const response = await api.post<Usuario>('/auth/registro', data);
    return response.data;
  }
}; 