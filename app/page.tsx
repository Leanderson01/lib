'use client'
import { Text } from "@mantine/core";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { BookCard } from "./components/cards/BookCard";
import { CategoryCard } from "./components/cards/CategoryCard";
import { AuthorCard } from "./components/cards/AuthorCard";
import { SeeMoreButton } from "./components/buttons/SeeMoreButton";

export default function Home() {
  // Mock data
  const mockBooks = Array(5).fill({
    title: "Título do Livro",
    author: "Nome do Autor",
    cover: "/placeholder.jpg"
  });

  const mockCategories = Array(4).fill({
    name: "Nome da Categoria",
    image: "/placeholder.jpg"
  });

  const mockAuthors = Array(5).fill({
    name: "Nome do Autor",
    image: "/placeholder.jpg"
  });

  return (
    <div className="min-h-screen bg-[#F7F1E1]">
      <Header />

      <main className="container mx-auto py-8 px-4 space-y-12">
        {/* Livros Section */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <Text size="xl" fw={700}>Livros</Text>
            <SeeMoreButton redirectTo="books" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {mockBooks.map((book, index) => (
              <BookCard
                key={index}
                title={book.title}
                author={book.author}
                onClick={() => console.log('Clicou no livro:', index)}
              />
            ))}
          </div>
        </section>

        {/* Categorias Section */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <Text size="xl" fw={700}>Categorias</Text>
            <SeeMoreButton redirectTo="categories" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {mockCategories.map((category, index) => (
              <CategoryCard
                key={index}
                name={category.name}
                onClick={() => console.log('Clicou na categoria:', index)}
              />
            ))}
          </div>
        </section>

        {/* Autores Section */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <Text size="xl" fw={700}>Autores</Text>
            <SeeMoreButton redirectTo="authors" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {mockAuthors.map((author, index) => (
              <AuthorCard
                key={index}
                name={author.name}
                onClick={() => console.log('Clicou no autor:', index)}
              />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
