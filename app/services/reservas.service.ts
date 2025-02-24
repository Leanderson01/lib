import { api } from './api';
import { Reserva } from './types';

interface CriarReservaData {
  livro_id: number;
  data_reserva: string;
  data_entrega: string;
}

export const reservasService = {
  async listarMinhasReservas() {
    const response = await api.get<Reserva[]>('/reservas');
    return response.data;
  },

  async criar(data: CriarReservaData) {
    const response = await api.post<Reserva>('/reservas', data);
    return response.data;
  },

  async cancelar(id: number) {
    const response = await api.delete(`/reservas/${id}`);
    return response.data;
  }
}; 