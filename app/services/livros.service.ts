import { api } from './api';
import { Livro } from './types';

export const livrosService = {
  async listarTodos() {
    const response = await api.get<Livro[]>('/livros');
    return response.data;
  },

  async buscarPorId(id: number) {
    const response = await api.get<Livro>(`/livros/${id}`);
    return response.data;
  },

  async buscarPorCategoria(categoriaId: number) {
    const response = await api.get<Livro[]>(`/livros/categoria/${categoriaId}`);
    return response.data;
  },

  async buscarPorAutor(autorId: number) {
    const response = await api.get<Livro[]>(`/livros/autor/${autorId}`);
    return response.data;
  }
}; 