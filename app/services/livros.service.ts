import { api } from './api';
import { Livro } from './types';

// Estendendo a interface Livro para incluir o nome da categoria
interface LivroComCategoria extends Livro {
  categoria_nome?: string;
}

export const livrosService = {
  async listarTodos() {
    const response = await api.get<LivroComCategoria[]>('/livros');
    return response.data;
  },

  async buscarPorId(id: number) {
    const response = await api.get<LivroComCategoria>(`/livros/${id}`);
    return response.data;
  },

  async buscarPorCategoria(categoriaId: number) {
    const response = await api.get<LivroComCategoria[]>(`/livros/categoria/${categoriaId}`);
    return response.data;
  },

  async buscarPorAutor(autorId: number) {
    const response = await api.get<LivroComCategoria[]>(`/livros/autor/${autorId}`);
    return response.data;
  }
}; 