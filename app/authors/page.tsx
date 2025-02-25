'use client';
import { Text, Button } from "@mantine/core";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { autoresService } from "../services";
import Providers from "../providers";
import { useAuth } from "../hooks/useAuth";
import { useEffect } from "react";

function AuthorsPage() {
  const router = useRouter();
  const { updateUserData } = useAuth(); // Adicionando proteção de rota

  // Atualizar dados do usuário ao carregar a página
  useEffect(() => {
    updateUserData();
  }, []);

  // Buscar dados reais do servidor
  const { data: autores = [], isLoading } = useQuery({
    queryKey: ['autores'],
    queryFn: autoresService.listarTodos
  });

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

        {isLoading ? (
          <div className="text-center py-12">
            <Text>Carregando autores...</Text>
          </div>
        ) : autores.length === 0 ? (
          <div className="text-center py-12">
            <Text>Nenhum autor encontrado</Text>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {autores.map((autor) => (
              <div key={autor.autor_id} className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-full h-48 bg-gray-200 rounded-full mb-4 mx-auto" style={{ maxWidth: '200px' }} />
                <Text fw={700} size="lg" mb={2} className="text-center">{autor.nome}</Text>
                <Text c="dimmed" mb={3} size="sm" className="line-clamp-3">
                  {autor.nacionalidade || "Nacionalidade não informada"}
                </Text>
                <Button
                  variant="light"
                  fullWidth
                  onClick={() => handleAuthorClick(autor.autor_id)}
                  className="!bg-[#303A6B] !text-white hover:!bg-[#252d54]"
                >
                  Ver Livros
                </Button>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default function Authors() {
  return (
    <Providers>
      <AuthorsPage />
    </Providers>
  );
} 