'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '../services/api';
import { Usuario } from '../services/types';

export function useAuth() {
  const router = useRouter();

  useEffect(() => {
    // Verificar se o usuário está logado
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/auth/login');
      }
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

  // Função para atualizar os dados do usuário
  const updateUserData = async () => {
    if (typeof window !== 'undefined' && isAuthenticated()) {
      try {
        // Obter o usuário atual do localStorage para enviar o ID no cabeçalho
        const currentUser = getCurrentUser();
        
        // Configurar os cabeçalhos manualmente para garantir que o token e o ID do usuário sejam enviados
        const headers: Record<string, string> = {
          'Authorization': `Bearer ${localStorage.getItem('token') || ''}`,
        };
        
        if (currentUser && currentUser.usuario_id) {
          headers['X-User-ID'] = currentUser.usuario_id.toString();
        }
        
        const response = await api.get<Usuario>('/usuarios/atual', { headers });
        
        if (response.data) {
          localStorage.setItem('user', JSON.stringify(response.data));
          return response.data;
        }
      } catch (error) {
        console.error('Erro ao atualizar dados do usuário:', error);
      }
    }
    return null;
  };

  return {
    isAuthenticated,
    getCurrentUser,
    logout,
    updateUserData
  };
} 