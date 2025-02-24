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
  }
}; 