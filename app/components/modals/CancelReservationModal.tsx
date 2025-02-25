'use client';
import { Modal, Text, Button, Group } from '@mantine/core';

interface CancelReservationModalProps {
  opened: boolean;
  onClose: () => void;
  onConfirm: () => void;
  bookTitle: string;
  isLoading?: boolean;
}

export function CancelReservationModal({ 
  opened, 
  onClose, 
  onConfirm,
  bookTitle,
  isLoading = false
}: CancelReservationModalProps) {
  return (
    <Modal 
      opened={opened} 
      onClose={onClose}
      title="Deseja cancelar a reserva?"
      centered
      size="sm"
      closeOnClickOutside={!isLoading}
      closeOnEscape={!isLoading}
    >
      <div className="space-y-4">
        <Text>
          Você está prestes a cancelar a reserva do livro <strong>{bookTitle}</strong>. 
          Esta ação não pode ser desfeita.
        </Text>
        
        <Group justify="center" mt="xl">
          <Button 
            variant="outline" 
            color="gray"
            onClick={onClose}
            fullWidth
            disabled={isLoading}
          >
            Não
          </Button>
          <Button 
            variant="filled" 
            color="red"
            onClick={onConfirm}
            fullWidth
            loading={isLoading}
          >
            {isLoading ? 'Cancelando...' : 'Sim, cancelar'}
          </Button>
        </Group>
      </div>
    </Modal>
  );
} 