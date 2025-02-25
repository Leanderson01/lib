'use client';
import { Text, Button, Avatar, Loader, TextInput } from "@mantine/core";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { usuariosService } from "../services/usuarios.service";
import Providers from "../providers";
import { useForm } from "@mantine/form";
import { useAuth } from "../hooks/useAuth";

function ProfilePage() {
  const router = useRouter();
  useAuth(); // Isso vai verificar a autenticação e redirecionar se necessário

  // Buscar dados do usuário logado
  const { data: usuario, isLoading } = useQuery({
    queryKey: ['usuario', 'atual'],
    queryFn: usuariosService.obterUsuarioAtual
  });

  // Configurar o formulário com os dados do usuário
  const form = useForm({
    initialValues: {
      nome: '',
      email: '',
      telefone: ''
    },
  });

  // Atualizar o formulário quando os dados do usuário forem carregados
  if (usuario && form.values.nome === '') {
    form.setValues({
      nome: usuario.nome,
      email: usuario.email,
      telefone: usuario.telefone || ''
    });
  }

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

        {/* Profile Section */}
        <section className="bg-white rounded-lg p-6 shadow-sm mb-8 max-w-2xl mx-auto">
          <Text fw={700} size="xl" mb="lg" ta="center">Meu Perfil</Text>

          {isLoading ? (
            <div className="flex justify-center py-8">
              <Loader />
            </div>
          ) : !usuario ? (
            <Text ta="center" py="lg">Não foi possível carregar os dados do usuário</Text>
          ) : (
            <div className="space-y-6">
              <div className="flex flex-col items-center gap-4 mb-6">
                <Avatar size={120} radius="xl" />
                <Text fw={600} size="lg">{usuario.nome}</Text>
              </div>

              <form className="space-y-4">
                <TextInput
                  label="Nome"
                  placeholder="Seu nome"
                  {...form.getInputProps('nome')}
                  disabled
                />
                <TextInput
                  label="Email"
                  placeholder="Seu email"
                  {...form.getInputProps('email')}
                  disabled
                />
                <TextInput
                  label="Telefone"
                  placeholder="Seu telefone"
                  {...form.getInputProps('telefone')}
                  disabled
                />

                <Text size="sm" c="dimmed" mt="md">
                  * Para alterar seus dados, entre em contato com a administração da biblioteca.
                </Text>
              </form>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default function Profile() {
  return (
    <Providers>
      <ProfilePage />
    </Providers>
  );
} 