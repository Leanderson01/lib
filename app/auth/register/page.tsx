"use client";
import {
  TextInput,
  Button,
  Card,
  Text,
  InputBase,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import Image from "next/image";
import { Mail, Phone } from "lucide-react";
import { IMaskInput } from "react-imask";
import { notifications } from '@mantine/notifications';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { api } from '@/app/services/api';
import { Usuario } from '@/app/services/types';
import { AxiosError } from 'axios';
import Providers from '@/app/providers';

interface FormValues {
  name: string;
  email: string;
  phone: string;
}

interface ErrorResponse {
  message: string;
}

function RegisterForm() {
  const router = useRouter();

  const form = useForm<FormValues>({
    initialValues: {
      name: "",
      email: "",
      phone: "",
    },
    validate: {
      name: (value) =>
        value.length < 3 ? "Nome deve ter pelo menos 3 caracteres" : null,
      email: (value) =>
        /^\S+@\S+$/.test(value) ? null : "Email inválido",
      phone: (value) => {
        if (!value) return null;
        const numbers = value.replace(/\D/g, "");
        return numbers.length === 11 ? null : "Telefone inválido";
      },
    },
  });

  const registerMutation = useMutation<Usuario, AxiosError<ErrorResponse>, FormValues>({
    mutationFn: async (values) => {
      const response = await api.post<Usuario>('/auth/registro', {
        nome: values.name,
        email: values.email,
        telefone: values.phone,
      });
      return response.data;
    },
    onSuccess: () => {
      notifications.show({
        title: 'Sucesso!',
        message: 'Cadastro realizado com sucesso.',
        color: 'green',
      });
      router.push('/auth/login');
    },
    onError: (error) => {
      notifications.show({
        title: 'Erro',
        message: error.response?.data?.message || 'Erro ao realizar cadastro',
        color: 'red',
      });
    },
  });

  const handleSubmit = form.onSubmit((values) => {
    registerMutation.mutate(values);
  });

  return (
    <div className="min-h-screen bg-[#E3EBF6] grid place-items-center p-4">
      <Card         shadow="sm"
        padding="lg"
        radius="md"
        className="w-full max-w-[400px]">
        <div className="flex flex-col items-center gap-6">
          <div className="flex items-center gap-2">
            <Image src="/logo.svg" alt="logo" width={100} height={100} />
          </div>
          <Text size="xl" fw={800}>
            BookShelf
          </Text>
          <Text size="sm" className="text-center">
            Seja Bem-vindo(a)!
          </Text>

          <form onSubmit={handleSubmit} className="w-full">
            <div className="space-y-4">
              <TextInput
                label="Seu Nome"
                placeholder="Digite seu nome!"
                {...form.getInputProps("name")}
              />
              <TextInput
                label="E-mail"
                placeholder="seuemail@email.com"
                {...form.getInputProps("email")}
                rightSection={<Mail size={16} />}
              />
              <InputBase
                label="Número de Telefone"
                placeholder="(00) 00000-0000"
                {...form.getInputProps("phone")}
                rightSection={<Phone size={16} />}
                component={IMaskInput}
                mask="(00) 00000-0000"
              />
              <Button
                type="submit"
                className="!bg-[#303A6B] hover:!bg-[#252d54] !w-full !mt-8"
                loading={registerMutation.isPending}
              >
                {registerMutation.isPending ? 'Cadastrando...' : 'Cadastrar'}
              </Button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Providers>
      <RegisterForm />
    </Providers>
  );
}
