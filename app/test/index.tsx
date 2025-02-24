'use client';

import { useQuery, useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { livrosService, authService } from '../services';

export default function TestComponent() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const loginMutation = useMutation({
    mutationFn: () => authService.login({
      email: process.env.NEXT_PUBLIC_API_USER || '',
      senha: process.env.NEXT_PUBLIC_API_PASSWORD || ''
    }),
    onSuccess: (data) => {
      localStorage.setItem('token', data.token);
      setIsAuthenticated(true);
    }
  });

  const { data: livros, isLoading, error } = useQuery({
    queryKey: ['livros'],
    queryFn: livrosService.listarTodos,
    retry: 1,
    enabled: isAuthenticated, // só busca livros após autenticação
  });

  if (loginMutation.isPending) {
    return (
      <div className="p-4">
        <h1>Fazendo login...</h1>
        <p className="mt-2 text-gray-600">
          Tentando autenticar com usuário: {process.env.NEXT_PUBLIC_API_USER}
        </p>
      </div>
    );
  }

  if (loginMutation.error) {
    return (
      <div className="p-4">
        <h1 className="text-red-600">Erro ao fazer login</h1>
        <p className="mt-2">{(loginMutation.error as Error).message}</p>
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <p>Tentando com as credenciais:</p>
          <p>Usuário: {process.env.NEXT_PUBLIC_API_USER}</p>
          <p>Senha: {'*'.repeat(8)}</p>
        </div>
        <button 
          onClick={() => loginMutation.mutate()}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Tentar novamente
        </button>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="p-4">
        <h1>Teste de API</h1>
        <button 
          onClick={() => loginMutation.mutate()}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Fazer Login
        </button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="p-4">
        <h1>Carregando livros...</h1>
      </div>
    );
  }

  if (error) {
    console.error('Detalhes do erro:', error);
    return (
      <div className="p-4">
        <h1 className="text-red-600">Erro ao carregar livros</h1>
        <p className="mt-2">{(error as Error).message}</p>
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <p className="font-semibold">Verifique se:</p>
          <ul className="list-disc ml-4 mt-2">
            <li>O servidor está online e acessível</li>
            <li>A URL base está correta no arquivo .env ({process.env.NEXT_PUBLIC_API_URL})</li>
            <li>As credenciais estão corretas</li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1>Teste de API com React Query</h1>
      <p>Autenticado com sucesso!</p>
      <div className="mt-4">
        <h2>Livros:</h2>
        <ul className="list-disc ml-4 mt-2">
          {livros?.map((livro) => (
            <li key={livro.id}>{livro.titulo}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
