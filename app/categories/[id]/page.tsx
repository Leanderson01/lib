'use client';
import { Button, Text } from "@mantine/core";
import { Header } from "../../components/layout/Header";
import { Footer } from "../../components/layout/Footer";
import { BookCard } from "../../components/cards/BookCard";
import { ReserveBookModal } from "../../components/modals/ReserveBookModal";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { livrosService, categoriasService } from "../../services";
import { Livro } from "../../services/types";
import Providers from "../../providers";

interface PageProps {
  params: {
    id: string;
  };
}

function CategoryBooksPage({ params }: PageProps) {
  const router = useRouter();
  const [modalOpened, setModalOpened] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Livro | null>(null);
  const categoriaId = parseInt(params.id);

  // Buscar dados da categoria
  const { data: categoria, isLoading: isLoadingCategoria } = useQuery({
    queryKey: ['categoria', categoriaId],
    queryFn: () => categoriasService.buscarPorId(categoriaId),
    enabled: !isNaN(categoriaId)
  });

  // Buscar livros da categoria
  const { data: livros = [], isLoading: isLoadingLivros } = useQuery({
    queryKey: ['livros', 'categoria', categoriaId],
    queryFn: () => livrosService.buscarPorCategoria(categoriaId),
    enabled: !isNaN(categoriaId)
  });

  const handleBookClick = (livro: Livro) => {
    setSelectedBook(livro);
    setModalOpened(true);
  };

  // Função para obter o nome do autor principal
  const getMainAuthorName = (livro: Livro) => {
    if (livro.autores && livro.autores.length > 0) {
      return livro.autores[0].nome;
    }
    return "Autor desconhecido";
  };

  const isLoading = isLoadingCategoria || isLoadingLivros;

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
          {categoria && (
            <Text size="xl" fw={700} className="!text-[#303A6B]">
              Livros da categoria: {categoria.nome}
            </Text>
          )}
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <Text>Carregando livros...</Text>
          </div>
        ) : livros.length === 0 ? (
          <div className="text-center py-12">
            <Text>Nenhum livro encontrado nesta categoria</Text>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {livros.map((livro) => (
              <BookCard
                key={livro.livro_id}
                title={livro.titulo}
                author={getMainAuthorName(livro)}
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
            title: selectedBook.titulo,
            publishYear: selectedBook.ano_publicacao?.toString() || "Ano desconhecido",
            publisher: selectedBook.editora || "Editora desconhecida",
            authors: selectedBook.autores ? selectedBook.autores.map(autor => autor.nome) : ["Autor desconhecido"]
          }}
        />
      )}
    </div>
  );
}

export default function CategoryBooks({ params }: PageProps) {
  return (
    <Providers>
      <CategoryBooksPage params={params} />
    </Providers>
  );
} 