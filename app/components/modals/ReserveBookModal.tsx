'use client';
import { Modal, Text, Button, Group } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { useState } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';

interface ReserveBookModalProps {
  opened: boolean;
  onClose: () => void;
  bookData: {
    title: string;
    publishYear: string;
    publisher: string;
  };
}

export function ReserveBookModal({ opened, onClose, bookData }: ReserveBookModalProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [reserveDate, setReserveDate] = useState<Date | null>(null);
  const [returnDate, setReturnDate] = useState<Date | null>(null);

  const today = new Date();
  const maxDate = dayjs(today).add(3, 'month').toDate(); // Máximo de 3 meses para reserva

  const handleConfirm = () => {
    if (step === 1) {
      setStep(2);
    } else {
      console.log('Dados da reserva:', {
        book: bookData,
        reserveDate,
        returnDate
      });
      onClose();
      setStep(1);
    }
  };

  const handleCancel = () => {
    onClose();
    setStep(1);
  };

  return (
    <Modal 
      opened={opened} 
      onClose={handleCancel}
      title={step === 1 ? "Deseja reservar?" : "Selecione as Datas"}
      centered
      size="md"
    >
      {step === 1 ? (
        <div className="space-y-4">
          <div className="w-full h-48 bg-gray-200 rounded-md mb-4" />
          <Text fw={500}>{bookData.title}</Text>
          <Text size="sm">Ano de Publicação: {bookData.publishYear}</Text>
          <Text size="sm">Editora: {bookData.publisher}</Text>
          
          <Group justify="end" mt="xl">
            <Button 
              variant="subtle" 
              onClick={handleCancel}
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
              label="Reserva:"
              placeholder="DD/MM/AAAA"
              value={reserveDate}
              onChange={setReserveDate}
              minDate={today}
              maxDate={maxDate}
              locale="pt-BR"
              firstDayOfWeek={0}
              className="w-full"
              clearable={false}
            />
            <DatePickerInput
              label="Devolução:"
              placeholder="DD/MM/AAAA"
              value={returnDate}
              onChange={setReturnDate}
              minDate={reserveDate || today}
              maxDate={maxDate}
              locale="pt-BR"
              firstDayOfWeek={0}
              className="w-full"
              clearable={false}
              disabled={!reserveDate}
            />
          </div>

          <Group justify="center">
            <Button 
              variant="filled" 
              onClick={handleConfirm}
              disabled={!reserveDate || !returnDate}
              fullWidth
              className='!bg-[#303A6B] hover:!bg-[#252d54] disabled:!bg-gray-200'
            >
              Confirmar
            </Button>
          </Group>
        </div>
      )}
    </Modal>
  );
} 