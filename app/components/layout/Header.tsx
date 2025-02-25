'use client';
import { Text, Avatar, Group, Menu, Loader } from "@mantine/core";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { usuariosService } from "@/app/services/usuarios.service";
import { ChevronDown, User, LogOut, BookMarked } from "lucide-react";
import { useAuth } from "@/app/hooks/useAuth";
import { useEffect } from "react";

export function Header() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { logout, updateUserData } = useAuth();

  // Atualizar dados do usuário ao montar o componente
  useEffect(() => {
    updateUserData();
  }, []);

  // Buscar dados do usuário logado
  const { data: usuario, isLoading } = useQuery({
    queryKey: ['usuario', 'atual'],
    queryFn: usuariosService.obterUsuarioAtual
  });

  const handleLogout = () => {
    // Limpar o cache do React Query
    queryClient.clear();
    
    // Usar a função de logout do hook
    logout();
  };

  return (
    <header className="bg-[#303A6B] p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div 
          className="flex items-center gap-2 cursor-pointer" 
          onClick={() => router.push('/')}
        >
          <Image src="/logo.svg" alt="logo" width={40} height={40} />
          <Text className="!text-white text-xl font-bold">BookShelf</Text>
        </div>
        
        <Menu shadow="md" width={200} position="bottom-end">
          <Menu.Target>
            <Group gap={8} className="cursor-pointer">
              <Avatar 
                color="white" 
                radius="xl"
              />
              {isLoading ? (
                <Loader size="xs" color="white" />
              ) : (
                <>
                  <Text className="!text-white hidden md:block">
                    {usuario?.nome?.split(' ')[0] || 'Usuário'}
                  </Text>
                  <ChevronDown size={16} className="text-white" />
                </>
              )}
            </Group>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Label>Conta</Menu.Label>
            <Menu.Item 
              leftSection={<User size={14} />}
              onClick={() => router.push('/profile')}
            >
              Meu Perfil
            </Menu.Item>
            <Menu.Item 
              leftSection={<BookMarked size={14} />}
              onClick={() => router.push('/reservations')}
            >
              Minhas Reservas
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item 
              leftSection={<LogOut size={14} />}
              color="red"
              onClick={handleLogout}
            >
              Sair
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </div>
    </header>
  );
} 