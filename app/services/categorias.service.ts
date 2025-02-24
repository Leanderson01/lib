import { api } from './api';
import { Categoria } from './types';

export const categoriasService = {
  async listarTodas() {
    const response = await api.get<Categoria[]>('/categorias');
    return response.data;
  },

  async buscarPorId(id: number) {
    const response = await api.get<Categoria>(`/categorias/${id}`);
    return response.data;
  }
}; 