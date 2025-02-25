import { api } from './api';
import { Usuario } from './types';

export const usuariosService = {
  async listarTodos() {
    const response = await api.get<Usuario[]>('/usuarios');
    return response.data;
  },

  async buscarPorId(id: number) {
    const response = await api.get<Usuario>(`/usuarios/${id}`);
    return response.data;
  },

  async obterUsuarioAtual() {
    // Verificar se temos os dados do usuário no localStorage
    if (typeof window !== 'undefined') {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        try {
          const user = JSON.parse(userStr);
          return user as Usuario;
        } catch (error) {
          console.error('Erro ao parsear dados do usuário:', error);
        }
      }
    }
    
    // Se não tiver no localStorage ou ocorrer algum erro, buscar da API
    const response = await api.get<Usuario>('/usuarios/atual');
    
    // Armazenar os dados do usuário no localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    
    return response.data;
  }
}; 