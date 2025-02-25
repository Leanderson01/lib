'use client';
import { Text, Button, Avatar, Table, Loader } from "@mantine/core";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { useRouter } from "next/navigation";
import { ArrowLeft, Trash2 } from "lucide-react";
import { CancelReservationModal } from "../components/modals/CancelReservationModal";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { reservasService } from "../services/reservas.service";
import { usuariosService } from "../services/usuarios.service";
import { notifications } from '@mantine/notifications';
import Providers from "../providers";
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Reserva, Livro } from "../services/types";

// Interface para reserva com detalhes do livro
interface ReservaDetalhada extends Reserva {
  livro?: Livro;
}

function ReservationsPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [modalOpened, setModalOpened] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState<{
    id: number;
    bookTitle: string;
  } | null>(null);

  // Buscar dados do usuário logado
  const { 
    data: usuario, 
    isLoading: isLoadingUsuario 
  } = useQuery({
    queryKey: ['usuario', 'atual'],
    queryFn: usuariosService.obterUsuarioAtual
  });

  // Buscar reservas do usuário
  const { 
    data: reservas = [], 
    isLoading: isLoadingReservas 
  } = useQuery({
    queryKey: ['reservas', 'minhas'],
    queryFn: reservasService.listarMinhasReservas
  });

  // Mutação para cancelar reserva
  const cancelarReservaMutation = useMutation({
    mutationFn: (reservaId: number) => reservasService.cancelar(reservaId),
    onSuccess: () => {
      notifications.show({
        title: 'Sucesso',
        message: 'Reserva cancelada com sucesso',
        color: 'green',
      });
      queryClient.invalidateQueries({ queryKey: ['reservas', 'minhas'] });
    },
    onError: (error) => {
      notifications.show({
        title: 'Erro',
        message: 'Não foi possível cancelar a reserva',
        color: 'red',
      });
      console.error('Erro ao cancelar reserva:', error);
    }
  });

  const handleCancelClick = (reserva: ReservaDetalhada) => {
    setSelectedReservation({
      id: reserva.reserva_id,
      bookTitle: reserva.livro?.titulo || 'Livro'
    });
    setModalOpened(true);
  };

  const handleConfirmCancel = () => {
    if (selectedReservation) {
      cancelarReservaMutation.mutate(selectedReservation.id);
    }
    setModalOpened(false);
    setSelectedReservation(null);
  };

  // Função para formatar a data
  const formatarData = (dataString: string) => {
    try {
      const data = new Date(dataString);
      return format(data, 'dd/MM/yyyy', { locale: ptBR });
    } catch {
      return 'Data inválida';
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F1E1] flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto py-8 px-4">
        <div className="mb-8">
          <Button
            variant="subtle"
            leftSection={<ArrowLeft size={16} />}
            onClick={() => router.back()}
            className="!text-[#303A6B]"
          >
            Voltar
          </Button>
        </div>

        {/* User Info Section */}
        <section className="bg-white rounded-lg p-6 shadow-sm mb-8">
          {isLoadingUsuario ? (
            <div className="flex justify-center py-4">
              <Loader />
            </div>
          ) : !usuario ? (
            <Text ta="center">Não foi possível carregar os dados do usuário</Text>
          ) : (
            <div className="flex items-start gap-6">
              <Avatar size="xl" radius="xl" className="!h-24 !w-24" />
              <div className="flex-1 space-y-2">
                <Text fw={700} size="xl">{usuario.nome}</Text>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <Text size="sm">
                    <Text span fw={500}>E-mail:</Text> {usuario.email}
                  </Text>
                  {usuario.telefone && (
                    <Text size="sm">
                      <Text span fw={500}>Telefone:</Text> {usuario.telefone}
                    </Text>
                  )}
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Reservations Section */}
        <section className="bg-white rounded-lg p-6 shadow-sm">
          <Text fw={700} size="lg" mb="md">Minhas Reservas</Text>
          
          {isLoadingReservas ? (
            <div className="flex justify-center py-8">
              <Loader />
            </div>
          ) : reservas.length === 0 ? (
            <Text ta="center" py="lg">Você não possui reservas ativas.</Text>
          ) : (
            <Table>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Título</Table.Th>
                  <Table.Th>Data de Reserva</Table.Th>
                  <Table.Th>Status</Table.Th>
                  <Table.Th>Ações</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {(reservas as ReservaDetalhada[]).map((reserva) => (
                  <Table.Tr key={reserva.reserva_id}>
                    <Table.Td>{reserva.livro?.titulo || 'Livro não encontrado'}</Table.Td>
                    <Table.Td>{formatarData(reserva.data_reserva || '')}</Table.Td>
                    <Table.Td>{reserva.status}</Table.Td>
                    <Table.Td>
                      {reserva.status === 'ATIVA' && (
                        <Button
                          variant="subtle"
                          color="red"
                          onClick={() => handleCancelClick(reserva)}
                          leftSection={<Trash2 size={16} />}
                          loading={cancelarReservaMutation.isPending}
                        >
                          Cancelar
                        </Button>
                      )}
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          )}
        </section>
      </main>

      <Footer />

      {selectedReservation && (
        <CancelReservationModal
          opened={modalOpened}
          onClose={() => {
            setModalOpened(false);
            setSelectedReservation(null);
          }}
          onConfirm={handleConfirmCancel}
          bookTitle={selectedReservation.bookTitle}
          isLoading={cancelarReservaMutation.isPending}
        />
      )}
    </div>
  );
}

export default function Reservations() {
  return (
    <Providers>
      <ReservationsPage />
    </Providers>
  );
} 