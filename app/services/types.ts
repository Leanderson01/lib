export interface Usuario {
  id: number;
  nome: string;
  email_principal: string;
  email_secundario: string;
  telefone_principal: string;
  telefone_secundario: string;
}

export interface Livro {
  id: number;
  titulo: string;
  ano_publicacao: number;
  editora: string;
  categoria_id: number;
}

export interface Autor {
  id: number;
  nome: string;
  nacionalidade: string;
}

export interface Categoria {
  id: number;
  nome: string;
}

export interface Reserva {
  id: number;
  livro_id: number;
  usuario_id: number;
  data_reserva: string;
  data_entrega: string;
} 