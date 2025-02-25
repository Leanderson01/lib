import { api } from './api';
import { Reserva, Livro, Usuario } from './types';

export interface ReservaDetalhada extends Reserva {
  livro?: Livro;
  usuario?: Usuario;
}

interface CriarReservaData {
  livro_id: number;
  data_reserva?: string;
}

export const reservasService = {
  async listarMinhasReservas() {
    const response = await api.get<ReservaDetalhada[]>('/reservas/minhas');
    return response.data;
  },

  async criar(data: CriarReservaData) {
    const response = await api.post<Reserva>('/reservas', data);
    return response.data;
  },

  async cancelar(id: number) {
    const response = await api.patch<Reserva>(`/reservas/${id}/cancelar`, {
      status: 'CANCELADA'
    });
    return response.data;
  }
}; 