'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function useAuth() {
  const router = useRouter();

  useEffect(() => {
    // Verificar se o usuário está logado
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/auth/login');
    }
  }, [router]);

  // Função para verificar se o usuário está logado
  const isAuthenticated = () => {
    if (typeof window !== 'undefined') {
      return !!localStorage.getItem('token');
    }
    return false;
  };

  // Função para obter o usuário atual do localStorage
  const getCurrentUser = () => {
    if (typeof window !== 'undefined') {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        try {
          return JSON.parse(userStr);
        } catch (error) {
          console.error('Erro ao parsear dados do usuário:', error);
        }
      }
    }
    return null;
  };

  // Função para fazer logout
  const logout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      router.push('/auth/login');
    }
  };

  return {
    isAuthenticated,
    getCurrentUser,
    logout
  };
} 