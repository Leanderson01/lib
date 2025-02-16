"use client";
import {
  TextInput,
  Button,
  Card,
  Text,
  Stepper,
  PasswordInput,
  Group,
  InputBase,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import Image from "next/image";
import { useState } from "react";
import { Mail, Phone } from "lucide-react";
import { IMaskInput } from "react-imask";
interface FormValues {
  name: string;
  primaryEmail: string;
  secondaryEmail: string;
  primaryPhone: string;
  secondaryPhone: string;
  password: string;
  confirmPassword: string;
}

export default function Register() {
  const [active, setActive] = useState(0);

  const form = useForm<FormValues>({
    initialValues: {
      name: "",
      primaryEmail: "",
      secondaryEmail: "",
      primaryPhone: "",
      secondaryPhone: "",
      password: "",
      confirmPassword: "",
    },
    validate: {
      name: (value) =>
        value.length < 3 ? "Nome deve ter pelo menos 3 caracteres" : null,
      primaryEmail: (value) =>
        /^\S+@\S+$/.test(value) ? null : "Email inválido",
      secondaryEmail: (value) =>
        value ? (/^\S+@\S+$/.test(value) ? null : "Email inválido") : null,
      primaryPhone: (value) => {
        const numbers = value.replace(/\D/g, "");
        return numbers.length === 11 ? null : "Telefone inválido";
      },
      secondaryPhone: (value) => {
        if (!value) return null;
        const numbers = value.replace(/\D/g, "");
        return numbers.length === 11 ? null : "Telefone inválido";
      },
      password: (value) =>
        value.length < 6 ? "A senha deve ter pelo menos 6 caracteres" : null,
      confirmPassword: (value, values) =>
        value !== values.password ? "As senhas não coincidem" : null,
    },
  });

  const validateStep = (step: number) => {
    if (step === 0) {
      return (
        !form.validateField("name").hasError &&
        !form.validateField("primaryEmail").hasError &&
        !form.validateField("secondaryEmail").hasError
      );
    }
    if (step === 1) {
      return (
        !form.validateField("primaryPhone").hasError &&
        !form.validateField("secondaryPhone").hasError
      );
    }
    if (step === 2) {
      return (
        !form.validateField("password").hasError &&
        !form.validateField("confirmPassword").hasError
      );
    }
    return false;
  };

  const nextStep = () => {
    if (validateStep(active)) {
      setActive((current) => current + 1);
    }
  };

  const prevStep = () => {
    setActive((current) => current - 1);
  };

  const handleStepClick = (step: number) => {
    for (let i = 0; i < step; i++) {
      if (!validateStep(i)) return;
    }
    setActive(step);
  };

  const handleSubmit = form.onSubmit((values) => {
    console.log("Dados do formulário:", values);
  });

  return (
    <div className="min-h-screen bg-[#E3EBF6] grid place-items-center p-4">
      <Card shadow="sm" padding="xl" radius="md" className="w-full max-w-2xl">
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
            <Stepper
              active={active}
              onStepClick={handleStepClick}
              className="mb-6"
            >
              <Stepper.Step label="Passo 1" description="Info. básicas">
                <div className="space-y-4 mt-4">
                  <TextInput
                    label="Seu Nome"
                    placeholder="Digite seu nome!"
                    {...form.getInputProps("name")}
                  />
                  <TextInput
                    label="E-mail Principal"
                    placeholder="seuemail@email.com"
                    {...form.getInputProps("primaryEmail")}
                    rightSection={<Mail size={16} />}
                  />
                  <TextInput
                    label="E-mail Secundário"
                    placeholder="seuemail@email.com"
                    {...form.getInputProps("secondaryEmail")}
                    rightSection={<Mail size={16} />}
                  />
                </div>
              </Stepper.Step>

              <Stepper.Step label="Passo 2" description="Contatos">
                <div className="space-y-4 mt-4">
                  <InputBase
                    label="Número de Telefone Principal"
                    placeholder="(00) 00000-0000"
                    {...form.getInputProps("primaryPhone")}
                    rightSection={<Phone size={16} />}
                    component={IMaskInput}
                    mask="(00) 00000-0000"
                  />
                  <InputBase
                    label="Número de Telefone Secundário"
                    placeholder="(00) 00000-0000"
                    {...form.getInputProps("secondaryPhone")}
                    rightSection={<Phone size={16} />}
                    component={IMaskInput}
                    mask="(00) 00000-0000"
                  />
                </div>
              </Stepper.Step>

              <Stepper.Step label="Passo 3" description="Segurança">
                <div className="space-y-4 mt-4">
                  <PasswordInput
                    label="Senha"
                    placeholder="Digite sua senha!"
                    {...form.getInputProps("password")}
                  />
                  <PasswordInput
                    label="Confirme sua senha"
                    placeholder="Confirme sua senha!"
                    {...form.getInputProps("confirmPassword")}
                  />
                </div>
              </Stepper.Step>
            </Stepper>

            <Group justify="flex-end" mt="xl">
              {active > 0 && (
                <Button variant="default" onClick={prevStep}>
                  Voltar
                </Button>
              )}
              {active === 2 ? (
                <Button
                  type="submit"
                  className="!bg-[#303A6B] hover:!bg-[#252d54]"
                >
                  Login
                </Button>
              ) : (
                <Button
                  onClick={nextStep}
                  className="!bg-[#303A6B] hover:!bg-[#252d54]"
                >
                  Próximo
                </Button>
              )}
            </Group>
          </form>
        </div>
      </Card>
    </div>
  );
}
