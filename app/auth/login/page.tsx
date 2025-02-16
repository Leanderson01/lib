"use client";
import {
  TextInput,
  PasswordInput,
  Button,
  Card,
  Text,
  Divider,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import Link from "next/link";
import { Mail } from "lucide-react";
import Image from "next/image";
interface FormValues {
  email: string;
  password: string;
}

export default function Login() {
  const form = useForm<FormValues>({
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: (value: string) =>
        /^\S+@\S+$/.test(value) ? null : "Email inválido",
      password: (value: string) =>
        value.length < 6 ? "A senha deve ter pelo menos 6 caracteres" : null,
    },
  });

  const handleSubmit = form.onSubmit((values: FormValues) => {
    console.log("Dados do formulário:", values);
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
            />

            <PasswordInput
              label="Senha"
              placeholder="Digite sua senha!"
              {...form.getInputProps("password")}
            />

            <Button
              fullWidth
              type="submit"
              className="!bg-[#303A6B] hover:!bg-[#252d54]"
            >
              Login
            </Button>

            <Divider label="OR" labelPosition="center" my="md" />

            <Button
              component={Link}
              href="/auth/register"
              variant="outline"
              fullWidth
              color="gray"
            >
              Cadastre-se Agora!
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}
