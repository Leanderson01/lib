'use client'
import { Text } from "@mantine/core";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { BookCard } from "./components/cards/BookCard";
import { CategoryCard } from "./components/cards/CategoryCard";
import { AuthorCard } from "./components/cards/AuthorCard";
import { SeeMoreButton } from "./components/buttons/SeeMoreButton";
import { ReserveBookModal } from "./components/modals/ReserveBookModal";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { livrosService, autoresService, categoriasService } from "./services";
import { Livro } from "./services/types";
import Providers from "./providers";
import { useAuth } from "./hooks/useAuth";

function HomePage() {
  const router = useRouter();
  const { updateUserData } = useAuth(); // Adicionando proteção de rota
  
  // Atualizar dados do usuário ao carregar a página
  useEffect(() => {
    updateUserData();
  }, []);
  
  const [modalOpened, setModalOpened] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Livro | null>(null);

  // Buscar dados reais do servidor
  const { data: livros = [], isLoading: isLoadingLivros } = useQuery({
    queryKey: ['livros'],
    queryFn: livrosService.listarTodos
  });

  const { data: categorias = [], isLoading: isLoadingCategorias } = useQuery({
    queryKey: ['categorias'],
    queryFn: categoriasService.listarTodas
  });

  const { data: autores = [], isLoading: isLoadingAutores } = useQuery({
    queryKey: ['autores'],
    queryFn: autoresService.listarTodos
  });

  // Função para obter o nome do autor principal
  const getMainAuthorName = (livro: Livro) => {
    if (livro.autores && livro.autores.length > 0) {
      return livro.autores[0].nome;
    }
    return "Autor desconhecido";
  };

  console.log(livros);
  console.log(autores);
  console.log(categorias);

  const handleBookClick = (livro: Livro) => {
    setSelectedBook(livro);
    setModalOpened(true);
  };

  const handleCategoryClick = (id: number) => {
    router.push(`/categories/${id}`);
  };

  const handleAuthorClick = (id: number) => {
    router.push(`/authors/${id}`);
  };

  return (
    <div className="min-h-screen bg-[#F7F1E1] flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto py-8 px-4 space-y-12">
        {/* Livros Section */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <Text size="xl" fw={700} className="!text-[#555F73]">Livros</Text>
            <SeeMoreButton redirectTo="books" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {isLoadingLivros ? (
              <div className="col-span-full text-center py-8">Carregando livros...</div>
            ) : livros.length === 0 ? (
              <div className="col-span-full text-center py-8">Nenhum livro encontrado</div>
            ) : (
              livros.slice(0, 5).map((livro) => (
                <BookCard
                  key={livro.livro_id}
                  title={livro.titulo}
                  author={getMainAuthorName(livro)}
                  onClick={() => handleBookClick(livro)}
                />
              ))
            )}
          </div>
        </section>

        {/* Categorias Section */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <Text size="xl" fw={700} className="!text-[#303A6B]">Categorias</Text>
            <SeeMoreButton redirectTo="categories" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {isLoadingCategorias ? (
              <div className="col-span-full text-center py-8">Carregando categorias...</div>
            ) : categorias.length === 0 ? (
              <div className="col-span-full text-center py-8">Nenhuma categoria encontrada</div>
            ) : (
              categorias.slice(0, 4).map((categoria) => (
                <CategoryCard
                  key={categoria.categoria_id}
                  id={categoria.categoria_id}
                  name={categoria.nome}
                  onClick={() => handleCategoryClick(categoria.categoria_id)}
                />
              ))
            )}
          </div>
        </section>

        {/* Autores Section */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <Text size="xl" fw={700} className="!text-[#303A6B]">Autores</Text>
            <SeeMoreButton redirectTo="authors" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {isLoadingAutores ? (
              <div className="col-span-full text-center py-8">Carregando autores...</div>
            ) : autores.length === 0 ? (
              <div className="col-span-full text-center py-8">Nenhum autor encontrado</div>
            ) : (
              autores.slice(0, 5).map((autor) => (
                <AuthorCard
                  key={autor.autor_id}
                  id={autor.autor_id}
                  name={autor.nome}
                  onClick={handleAuthorClick}
                />
              ))
            )}
          </div>
        </section>
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

export default function Home() {
  return (
    <Providers>
      <HomePage />
    </Providers>
  );
}
