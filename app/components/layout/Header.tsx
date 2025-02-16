'use client';
import { Text, Avatar } from "@mantine/core";
import Image from "next/image";
import { useRouter } from "next/navigation";

export function Header() {
  const router = useRouter();

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
        <Avatar 
          color="white" 
          radius="xl" 
          className="cursor-pointer"
          onClick={() => router.push('/reservations')}
        />
      </div>
    </header>
  );
} 