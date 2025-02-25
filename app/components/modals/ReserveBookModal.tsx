'use client';
import { Modal, Text, Button, Group } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { useState } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { reservasService } from '@/app/services/reservas.service';
import { notifications } from '@mantine/notifications';

interface ReserveBookModalProps {
  opened: boolean;
  onClose: () => void;
  bookData: {
    id?: number;
    title: string;
    publishYear: string;
    publisher: string;
    authors: string[];
  };
}

export function ReserveBookModal({ opened, onClose, bookData }: ReserveBookModalProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [reserveDate, setReserveDate] = useState<Date | null>(null);
  const queryClient = useQueryClient();

  const today = new Date();
  const maxDate = dayjs(today).add(3, 'month').toDate(); // Máximo de 3 meses para reserva

  // Mutação para criar reserva
  const criarReservaMutation = useMutation({
    mutationFn: () => {
      if (!bookData.id || !reserveDate) {
        throw new Error('Dados incompletos para reserva');
      }
      
      // Formatar a data para o formato aceito pelo MySQL (YYYY-MM-DD HH:MM:SS)
      const formattedDate = reserveDate.toISOString().slice(0, 19).replace('T', ' ');
      
      return reservasService.criar({
        livro_id: bookData.id,
        data_reserva: formattedDate
      });
    },
    onSuccess: () => {
      // Invalidar queries para atualizar os dados
      queryClient.invalidateQueries({ queryKey: ['reservas', 'minhas'] });
      
      notifications.show({
        title: 'Sucesso',
        message: 'Livro reservado com sucesso!',
        color: 'green',
      });
      handleClose();
    },
    onError: (error) => {
      notifications.show({
        title: 'Erro',
        message: error instanceof Error 
          ? error.message 
          : 'Não foi possível realizar a reserva',
        color: 'red',
      });
    }
  });

  const handleConfirm = () => {
    if (step === 1) {
      setStep(2);
    } else if (reserveDate) {
      criarReservaMutation.mutate();
    }
  };

  const handleClose = () => {
    onClose();
    setStep(1);
    setReserveDate(null);
  };

  return (
    <Modal 
      opened={opened} 
      onClose={handleClose}
      title={step === 1 ? "Deseja reservar?" : "Selecione a Data"}
      centered
      size="md"
      closeOnClickOutside={!criarReservaMutation.isPending}
      closeOnEscape={!criarReservaMutation.isPending}
    >
      {step === 1 ? (
        <div className="space-y-4">
          <div className="w-full h-48 bg-gray-200 rounded-md mb-4" />
          <Text fw={500}>{bookData.title}</Text>
          <Text size="sm">Ano de Publicação: {bookData.publishYear}</Text>
          <Text size="sm">Editora: {bookData.publisher}</Text>
          <Text size="sm">Autores: {bookData.authors.join(', ')}</Text>
          
          <Group justify="end" mt="xl">
            <Button 
              variant="subtle" 
              onClick={handleClose}
            >
              Não
            </Button>
            <Button 
              variant="filled" 
              onClick={handleConfirm}
              className='!bg-[#303A6B] hover:!bg-[#252d54]'
            >
              Sim
            </Button>
          </Group>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="space-y-4">
            <DatePickerInput
              label="Data da Reserva:"
              placeholder="DD/MM/AAAA"
              value={reserveDate}
              onChange={setReserveDate}
              minDate={today}
              maxDate={maxDate}
              locale="pt-BR"
              firstDayOfWeek={0}
              className="w-full"
              clearable={false}
              disabled={criarReservaMutation.isPending}
              valueFormat="DD/MM/YYYY"
            />
          </div>

          <Group justify="center">
            <Button 
              variant="filled" 
              onClick={handleConfirm}
              disabled={!reserveDate || criarReservaMutation.isPending}
              loading={criarReservaMutation.isPending}
              fullWidth
              className='!bg-[#303A6B] hover:!bg-[#252d54] disabled:!bg-gray-200'
            >
              {criarReservaMutation.isPending ? 'Reservando...' : 'Confirmar Reserva'}
            </Button>
          </Group>
        </div>
      )}
    </Modal>
  );
} 