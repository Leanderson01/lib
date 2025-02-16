'use client';
import { Text, Button, Avatar, Table } from "@mantine/core";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { useRouter } from "next/navigation";
import { ArrowLeft, Trash2 } from "lucide-react";
import { CancelReservationModal } from "../components/modals/CancelReservationModal";
import { useState } from "react";

export default function Reservations() {
  const router = useRouter();
  const [modalOpened, setModalOpened] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState<{
    id: number;
    bookTitle: string;
  } | null>(null);

  // Mock data - No futuro, isso virá da API
  const mockUser = {
    name: "Nome",
    primaryEmail: "E-mail Principal",
    secondaryEmail: "E-mail Secundário",
    primaryPhone: "(00) 0 0000-0000",
    secondaryPhone: "(00) 0 0000-0000",
  };

  const mockReservations = Array(5).fill(null).map((_, index) => ({
    id: index + 1,
    bookTitle: "Título do Livro",
    reserveDate: "01/03/2024",
    returnDate: "15/03/2024"
  }));

  const handleCancelClick = (reservation: typeof mockReservations[0]) => {
    setSelectedReservation({
      id: reservation.id,
      bookTitle: reservation.bookTitle
    });
    setModalOpened(true);
  };

  const handleConfirmCancel = () => {
    if (selectedReservation) {
      console.log('Cancelando reserva:', selectedReservation.id);
      // Aqui será feita a chamada para a API para cancelar a reserva
    }
    setModalOpened(false);
    setSelectedReservation(null);
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
          <div className="flex items-start gap-6">
            <Avatar size="xl" radius="xl" className="!h-24 !w-24" />
            <div className="flex-1 space-y-2">
              <Text fw={700} size="xl">{mockUser.name}</Text>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <Text size="sm">
                  <Text span fw={500}>E-mail Principal:</Text> {mockUser.primaryEmail}
                </Text>
                <Text size="sm">
                  <Text span fw={500}>E-mail Secundário:</Text> {mockUser.secondaryEmail}
                </Text>
                <Text size="sm">
                  <Text span fw={500}>Telefone 1:</Text> {mockUser.primaryPhone}
                </Text>
                <Text size="sm">
                  <Text span fw={500}>Telefone 2:</Text> {mockUser.secondaryPhone}
                </Text>
              </div>
            </div>
          </div>
        </section>

        {/* Reservations Section */}
        <section className="bg-white rounded-lg p-6 shadow-sm">
          <Text fw={700} size="lg" mb="md">Minhas Reservas</Text>
          
          <Table>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Título</Table.Th>
                <Table.Th>Data de Reserva</Table.Th>
                <Table.Th>Data de Entrega</Table.Th>
                <Table.Th>Ações</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {mockReservations.map((reservation) => (
                <Table.Tr key={reservation.id}>
                  <Table.Td>{reservation.bookTitle}</Table.Td>
                  <Table.Td>{reservation.reserveDate}</Table.Td>
                  <Table.Td>{reservation.returnDate}</Table.Td>
                  <Table.Td>
                    <Button
                      variant="subtle"
                      color="red"
                      onClick={() => handleCancelClick(reservation)}
                      leftSection={<Trash2 size={16} />}
                    >
                      Cancelar
                    </Button>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
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
        />
      )}
    </div>
  );
} 