import { api } from './api';
import { Reserva, Livro } from './types';

interface ReservaComLivro extends Reserva {
  livro: Livro;
}

interface CriarReservaData {
  livro_id: number;
}

export const reservasService = {
  async listarMinhasReservas() {
    const response = await api.get<ReservaComLivro[]>('/reservas');
    return response.data;
  },

  async criar(data: CriarReservaData) {
    const response = await api.post<Reserva>('/reservas', data);
    return response.data;
  },

  async cancelar(id: number) {
    const response = await api.patch<Reserva>(`/reservas/${id}`, {
      status: 'CANCELADA'
    });
    return response.data;
  }
}; 