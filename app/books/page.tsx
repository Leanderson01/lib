'use client';
import { Button } from "@mantine/core";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { BookCard } from "../components/cards/BookCard";
import { ReserveBookModal } from "../components/modals/ReserveBookModal";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { livrosService } from "../services";
import { Livro } from "../services/types";
import Providers from "../providers";
import { useAuth } from "../hooks/useAuth";

function BooksPage() {
  const router = useRouter();
  const { updateUserData } = useAuth(); // Adicionando proteção de rota
  
  // Atualizar dados do usuário ao carregar a página
  useEffect(() => {
    updateUserData();
  }, [updateUserData]);
  
  const [modalOpened, setModalOpened] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Livro | null>(null);

  // Buscar dados reais do servidor
  const { data: livros = [], isLoading } = useQuery({
    queryKey: ['livros'],
    queryFn: livrosService.listarTodos
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

        {isLoading ? (
          <div className="text-center py-12">
            <p>Carregando livros...</p>
          </div>
        ) : livros.length === 0 ? (
          <div className="text-center py-12">
            <p>Nenhum livro encontrado</p>
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
            id: selectedBook.livro_id,
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

export default function Books() {
  return (
    <Providers>
      <BooksPage />
    </Providers>
  );
}