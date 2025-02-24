import { api } from './api';
import { Livro, Autor } from './types';

interface LivroComAutores extends Livro {
  autores: Autor[];
}

export const livrosService = {
  async listarTodos() {
    const response = await api.get<LivroComAutores[]>('/livros');
    return response.data;
  },

  async buscarPorId(id: number) {
    const response = await api.get<LivroComAutores>(`/livros/${id}`);
    return response.data;
  },

  async buscarPorCategoria(categoriaId: number) {
    const response = await api.get<LivroComAutores[]>(`/livros/categoria/${categoriaId}`);
    return response.data;
  },

  async buscarPorAutor(autorId: number) {
    const response = await api.get<LivroComAutores[]>(`/livros/autor/${autorId}`);
    return response.data;
  }
}; 