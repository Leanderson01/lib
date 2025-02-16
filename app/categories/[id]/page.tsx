'use client';
import { Button } from "@mantine/core";
import { Header } from "../../components/layout/Header";
import { Footer } from "../../components/layout/Footer";
import { BookCard } from "../../components/cards/BookCard";
import { ReserveBookModal } from "../../components/modals/ReserveBookModal";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

interface PageProps {
  params: {
    id: string;
  };
}

export default function CategoryBooks({ params }: PageProps) {
  const router = useRouter();
  const [modalOpened, setModalOpened] = useState(false);
  const [selectedBook, setSelectedBook] = useState<{
    title: string;
    publishYear: string;
    publisher: string;
  } | null>(null);

  // Mock data - No futuro, isso virá da API com base no ID da categoria
  const mockBooks = Array(10).fill({
    title: "Título do Livro",
    author: "Nome do Autor",
    publishYear: "2024",
    publisher: "Editora Example",
    cover: "/placeholder.jpg"
  });

  const handleBookClick = (book: typeof mockBooks[0]) => {
    setSelectedBook({
      title: book.title,
      publishYear: book.publishYear,
      publisher: book.publisher
    });
    setModalOpened(true);
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

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {mockBooks.map((book, index) => (
            <BookCard
              key={index}
              title={book.title}
              author={book.author}
              onClick={() => handleBookClick(book)}
            />
          ))}
        </div>
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