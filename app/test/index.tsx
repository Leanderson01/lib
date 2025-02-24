'use client';

import { useQuery } from '@tanstack/react-query';
import { usuariosService } from '../services/usuarios.service';

export default function TestComponent() {
  const { data: usuarios, isLoading, error } = useQuery({
    queryKey: ['usuarios'],
    queryFn: usuariosService.listarTodos
  });

  if (isLoading) {
    return (
      <div className="p-4">
        <h1>Carregando usuários...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <h1 className="text-red-600">Erro ao carregar usuários</h1>
        <p className="mt-2">{(error as Error).message}</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Lista de Usuários</h1>
      <div className="grid gap-4">
        {usuarios?.map(usuario => (
          <div 
            key={usuario.usuario_id} 
            className="bg-white p-4 rounded-lg shadow"
          >
            <h2 className="text-xl font-semibold">{usuario.nome}</h2>
            <p className="text-gray-600">Email: {usuario.email}</p>
            {usuario.telefone && (
              <p className="text-gray-600">Telefone: {usuario.telefone}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
