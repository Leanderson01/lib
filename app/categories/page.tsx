'use client';
import { Text, Button } from "@mantine/core";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function Categories() {
  const router = useRouter();

  // Mock data - No futuro, isso virá da API
  const mockCategories = Array(12).fill(null).map((_, index) => ({
    id: index + 1,
    name: "Nome da Categoria",
    image: "/placeholder.jpg",
    description: "Descrição detalhada da categoria, incluindo os tipos de livros e temas abordados.",
    totalBooks: Math.floor(Math.random() * 100) + 20,
    popularAuthors: ["Autor 1", "Autor 2", "Autor 3"]
  }));

  const handleCategoryClick = (id: number) => {
    router.push(`/categories/${id}`);
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
          <Text size="xl" fw={700} className="!text-[#303A6B]">Todas as Categorias</Text>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {mockCategories.map((category) => (
            <div key={category.id} className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-full h-40 bg-gray-200 rounded-lg mb-4" />
              <Text fw={700} size="lg" mb={2}>{category.name}</Text>
              <Text c="dimmed" mb={3} size="sm" className="line-clamp-3">{category.description}</Text>
              <div className="mb-4">
                <Text size="sm" className="text-[#303A6B]">{category.totalBooks} livros</Text>
                <Text size="sm" c="dimmed" className="line-clamp-1">
                  Autores populares: {category.popularAuthors.join(", ")}
                </Text>
              </div>
              <Button
                variant="light"
                fullWidth
                onClick={() => handleCategoryClick(category.id)}
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