'use client';
import { Button, Text } from "@mantine/core";
import { Header } from "../../components/layout/Header";
import { Footer } from "../../components/layout/Footer";
import { BookCard } from "../../components/cards/BookCard";
import { ReserveBookModal } from "../../components/modals/ReserveBookModal";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { livrosService, autoresService } from "../../services";
import { Livro } from "../../services/types";
import Providers from "../../providers";
import { useAuth } from "../../hooks/useAuth";

interface PageProps {
  params: {
    id: string;
  };
}

function AuthorBooksPage({ params }: PageProps) {
  const router = useRouter();
  const { updateUserData } = useAuth(); // Adicionando proteção de rota
  
  // Atualizar dados do usuário ao carregar a página
  useEffect(() => {
    updateUserData();
  }, []);
  
  const [modalOpened, setModalOpened] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Livro | null>(null);
  const autorId = parseInt(params.id);

  // Buscar dados do autor
  const { data: autor, isLoading: isLoadingAutor } = useQuery({
    queryKey: ['autor', autorId],
    queryFn: () => autoresService.buscarPorId(autorId),
    enabled: !isNaN(autorId)
  });

  // Buscar livros do autor
  const { data: livros = [], isLoading: isLoadingLivros } = useQuery({
    queryKey: ['livros', 'autor', autorId],
    queryFn: () => livrosService.buscarPorAutor(autorId),
    enabled: !isNaN(autorId)
  });

  const handleBookClick = (livro: Livro) => {
    setSelectedBook(livro);
    setModalOpened(true);
  };

  // Função para obter o nome do autor principal ou usar o autor atual
  const getAuthorName = (livro: Livro) => {
    // Se temos o autor atual, usamos ele
    if (autor) {
      return autor.nome;
    }
    // Caso contrário, tentamos pegar do livro
    if (livro.autores && livro.autores.length > 0) {
      return livro.autores[0].nome;
    }
    return "Autor desconhecido";
  };

  const isLoading = isLoadingAutor || isLoadingLivros;

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
          {autor && (
            <Text size="xl" fw={700} className="!text-[#303A6B]">
              Livros de {autor.nome}
            </Text>
          )}
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <Text>Carregando livros...</Text>
          </div>
        ) : livros.length === 0 ? (
          <div className="text-center py-12">
            <Text>Nenhum livro encontrado deste autor</Text>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {livros.map((livro) => (
              <BookCard
                key={livro.livro_id}
                title={livro.titulo}
                author={getAuthorName(livro)}
                onClick={() => handleBookClick(livro)}
              />
            ))}
          </div>
        )}
      </main>

      <Footer />

      {selectedBook && (
        <ReserveBookModal
          opened={modalOpened}
          onClose={() => {
            setModalOpened(false);
            setSelectedBook(null);
          }}
          bookData={{
            id: selectedBook.livro_id,
            title: selectedBook.titulo,
            publishYear: selectedBook.ano_publicacao?.toString() || "Ano desconhecido",
            publisher: selectedBook.editora || "Editora desconhecida",
            authors: selectedBook.autores ? selectedBook.autores.map(autor => autor.nome) : [autor?.nome || "Autor desconhecido"]
          }}
        />
      )}
    </div>
  );
}

export default function AuthorBooks({ params }: PageProps) {
  return (
    <Providers>
      <AuthorBooksPage params={params} />
    </Providers>
  );
} 