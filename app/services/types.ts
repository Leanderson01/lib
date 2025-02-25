export interface Usuario {
  usuario_id: number;
  nome: string;
  email: string;
  telefone: string | null;
}

export interface Livro {
  livro_id: number;
  titulo: string;
  ano_publicacao: number | null;
  editora: string | null;
  categoria_id: number | null;
  categoria_nome?: string;
  autores?: Autor[];
}

export interface Autor {
  autor_id: number;
  nome: string;
  nacionalidade: string | null;
}

export interface Categoria {
  categoria_id: number;
  nome: string;
}

export interface Reserva {
  reserva_id: number;
  usuario_id: number | null;
  livro_id: number | null;
  data_reserva: string | null;
  status: string | null;
}

export interface Emprestimo {
  emprestimo_id: number;
  reserva_id: number | null;
  data_emprestimo: string;
  data_devolucao_prevista: string;
  data_devolucao_real: string | null;
}

export interface LivroAutor {
  livro_id: number;
  autor_id: number;
} 