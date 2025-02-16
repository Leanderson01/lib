'use client'
import { Text } from "@mantine/core";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { BookCard } from "./components/cards/BookCard";
import { CategoryCard } from "./components/cards/CategoryCard";
import { AuthorCard } from "./components/cards/AuthorCard";
import { SeeMoreButton } from "./components/buttons/SeeMoreButton";
import { ReserveBookModal } from "./components/modals/ReserveBookModal";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [modalOpened, setModalOpened] = useState(false);
  const [selectedBook, setSelectedBook] = useState<{
    title: string;
    publishYear: string;
    publisher: string;
  } | null>(null);

  // Mock data
  const mockBooks = Array(5).fill(null).map((_, index) => ({
    id: index + 1,
    title: "Título do Livro",
    author: "Nome do Autor",
    publishYear: "2024",
    publisher: "Editora Example",
    cover: "/placeholder.jpg"
  }));

  const mockCategories = Array(4).fill(null).map((_, index) => ({
    id: index + 1,
    name: "Nome da Categoria",
    image: "/placeholder.jpg"
  }));

  const mockAuthors = Array(5).fill(null).map((_, index) => ({
    id: index + 1,
    name: "Nome do Autor",
    image: "/placeholder.jpg"
  }));

  const handleBookClick = (book: typeof mockBooks[0]) => {
    setSelectedBook({
      title: book.title,
      publishYear: book.publishYear,
      publisher: book.publisher
    });
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
            {mockBooks.map((book) => (
              <BookCard
                key={book.id}
                title={book.title}
                author={book.author}
                onClick={() => handleBookClick(book)}
              />
            ))}
          </div>
        </section>

        {/* Categorias Section */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <Text size="xl" fw={700} className="!text-[#303A6B]">Categorias</Text>
            <SeeMoreButton redirectTo="categories" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {mockCategories.map((category) => (
              <CategoryCard
                key={category.id}
                id={category.id}
                name={category.name}
                onClick={() => handleCategoryClick(category.id)}
              />
            ))}
          </div>
        </section>

        {/* Autores Section */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <Text size="xl" fw={700} className="!text-[#303A6B]">Autores</Text>
            <SeeMoreButton redirectTo="authors" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {mockAuthors.map((author) => (
              <AuthorCard
                key={author.id}
                id={author.id}
                name={author.name}
                onClick={handleAuthorClick}
              />
            ))}
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
          bookData={selectedBook}
        />
      )}
    </div>
  );
}
