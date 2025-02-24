import { api } from './api';
import { Autor } from './types';

export const autoresService = {
  async listarTodos() {
    const response = await api.get<Autor[]>('/autores');
    return response.data;
  },

  async buscarPorId(id: number) {
    const response = await api.get<Autor>(`/autores/${id}`);
    return response.data;
  }
}; 