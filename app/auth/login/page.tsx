"use client";

import { TextInput, Button, Card, Text, Divider } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useMutation } from "@tanstack/react-query";
import { authService } from "@/app/services";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail } from "lucide-react";
import Image from "next/image";
import { notifications } from '@mantine/notifications';
import Providers from "@/app/providers";

interface FormValues {
  email: string;
}

function LoginForm() {
  const router = useRouter();

  const form = useForm<FormValues>({
    initialValues: {
      email: "",
    },
    validate: {
      email: (value: string) =>
        /^\S+@\S+$/.test(value) ? null : "Email inválido",
    },
  });

  const loginMutation = useMutation({
    mutationFn: (data: FormValues) => authService.login({ email: data.email, senha: '' }),
    onSuccess: (data) => {
      // Armazenar o token
      localStorage.setItem('token', data.token);
      
      // Armazenar os dados do usuário
      localStorage.setItem('user', JSON.stringify(data.user));
      
      // Mostrar notificação de sucesso
      notifications.show({
        title: 'Login realizado com sucesso!',
        message: 'Redirecionando para a página inicial...',
        color: 'green',
      });

      // Redirecionar para a home
      router.push('/');
    },
    onError: (error) => {
      // Mostrar notificação de erro
      notifications.show({
        title: 'Erro ao fazer login',
        message: error instanceof Error 
          ? error.message 
          : 'Não foi possível fazer login. Tente novamente.',
        color: 'red',
        autoClose: 5000,
      });

      // Limpar o formulário
      form.reset();
    },
  });

  const handleSubmit = form.onSubmit((values: FormValues) => {
    loginMutation.mutate(values);
  });

  return (
    <div className="min-h-screen bg-[#E3EBF6] grid place-items-center p-4">
      <Card
        shadow="sm"
        padding="lg"
        radius="md"
        className="w-full max-w-[400px]"
      >
        <div className="flex flex-col items-center gap-6">
          <div className="flex items-center gap-2">
            <Image src="/logo.svg" alt="logo" width={100} height={100} />
          </div>
          <Text size="xl" fw={800}>
            BookShelf
          </Text>

          <Text size="sm" className="text-center">Entre na sua conta!</Text>

          <form onSubmit={handleSubmit} className="w-full space-y-4">
            <TextInput
              label="Email"
              placeholder="alex@email.com"
              {...form.getInputProps("email")}
              rightSection={<Mail size={16} />}
              disabled={loginMutation.isPending}
            />

            <Button
              fullWidth
              type="submit"
              className="!bg-[#303A6B] hover:!bg-[#252d54]"
              loading={loginMutation.isPending}
            >
              {loginMutation.isPending ? 'Entrando...' : 'Login'}
            </Button>

            <Divider label="OR" labelPosition="center" my="md" />

            <Button
              component={Link}
              href="/auth/register"
              variant="outline"
              fullWidth
              color="gray"
              disabled={loginMutation.isPending}
            >
              Cadastre-se Agora!
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Providers>
      <LoginForm />
    </Providers>
  );
}
