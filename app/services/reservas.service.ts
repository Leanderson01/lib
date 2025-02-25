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
    try {
      const response = await api.get<ReservaDetalhada[]>('/reservas/minhas');
      return response.data;
    } catch (error) {
      console.error('Erro ao listar reservas:', error);
      throw error;
    }
  },

  async criar(data: CriarReservaData) {
    try {
      const response = await api.post<Reserva>('/reservas', data);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar reserva:', error);
      throw error;
    }
  },

  async cancelar(id: number) {
    try {
      const response = await api.patch<Reserva>(`/reservas/${id}/cancelar`, {
        status: 'CANCELADA'
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao cancelar reserva:', error);
      throw error;
    }
  }
}; 