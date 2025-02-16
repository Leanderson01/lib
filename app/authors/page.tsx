'use client';
import { Text, Button } from "@mantine/core";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function Authors() {
  const router = useRouter();

  // Mock data - No futuro, isso virá da API
  const mockAuthors = Array(15).fill(null).map((_, index) => ({
    id: index + 1,
    name: "Nome do Autor",
    image: "/placeholder.jpg",
    biography: "Breve biografia do autor com informações sobre sua carreira e principais obras publicadas.",
    totalBooks: Math.floor(Math.random() * 30) + 1,
  }));

  const handleAuthorClick = (id: number) => {
    router.push(`/authors/${id}`);
  };

  return (
    <div className="min-h-screen bg-[#F7F1E1] flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto py-8 px-4">
        <div className="mb-8 flex justify-between items-center">
          <Button
            variant="subtle"
            leftSection={<ArrowLeft size={16} />}
            onClick={() => router.back()}
            className="!text-[#303A6B]"
          >
            Voltar
          </Button>
          <Text size="xl" fw={700} className="!text-[#303A6B]">Todos os Autores</Text>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {mockAuthors.map((author) => (
            <div key={author.id} className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-full h-48 bg-gray-200 rounded-full mb-4 mx-auto" style={{ maxWidth: '200px' }} />
              <Text fw={700} size="lg" mb={2} className="text-center">{author.name}</Text>
              <Text c="dimmed" mb={3} size="sm" className="line-clamp-3">{author.biography}</Text>
              <div className="flex justify-end items-center mb-4">
                <Text size="sm" className="text-[#303A6B]">{author.totalBooks} livros</Text>
              </div>
              <Button
                variant="light"
                fullWidth
                onClick={() => handleAuthorClick(author.id)}
                className="!bg-[#303A6B] !text-white hover:!bg-[#252d54]"
              >
                Ver Livros
              </Button>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
} 