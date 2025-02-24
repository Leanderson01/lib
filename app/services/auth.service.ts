import { api } from './api';

interface LoginData {
  email: string;
  senha: string;
}

interface CadastroData {
  nome: string;
  email_principal: string;
  email_secundario: string;
  telefone_principal: string;
  telefone_secundario: string;
  senha: string;
}

export const authService = {
  async login(data: LoginData) {
    const response = await api.post('/auth/login', data);
    return response.data;
  },

  async cadastro(data: CadastroData) {
    const response = await api.post('/auth/registro', data);
    return response.data;
  }
}; 