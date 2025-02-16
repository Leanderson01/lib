# Manual da API da Biblioteca

## Índice
1. [Autenticação](#autenticação)
2. [Livros](#livros)
3. [Categorias](#categorias)
4. [Autores](#autores)
5. [Reservas](#reservas)

## Autenticação

### Login
```typescript
const response = await api.login(email, senha);
```
* **Método**: POST
* **Parâmetros**:
  - `email`: string (email principal do usuário)
  - `senha`: string (senha do usuário)
* **Retorno**: Dados do usuário autenticado

### Cadastro de Usuário
```typescript
const novoUsuario = {
  nome: "Nome do Usuário",
  email_principal: "email@exemplo.com",
  email_secundario: "email2@exemplo.com", // opcional
  telefone_principal: "(00) 00000-0000",
  telefone_secundario: "(00) 00000-0000", // opcional
  senha: "senha123"
};

const response = await api.cadastrarUsuario(novoUsuario);
```
* **Método**: POST
* **Parâmetros**: Objeto com dados do usuário
* **Retorno**: Confirmação do cadastro

## Livros

### Listar Todos os Livros
```typescript
const livros = await api.getLivros();
```
* **Método**: GET
* **Retorno**: Array de livros

### Buscar Livro por ID
```typescript
const livro = await api.getLivroPorId(id);
```
* **Método**: GET
* **Parâmetros**:
  - `id`: number (ID do livro)
* **Retorno**: Dados do livro específico

## Categorias

### Listar Todas as Categorias
```typescript
const categorias = await api.getCategorias();
```
* **Método**: GET
* **Retorno**: Array de categorias

### Listar Livros por Categoria
```typescript
const livros = await api.getLivrosPorCategoria(categoriaId);
```
* **Método**: GET
* **Parâmetros**:
  - `categoriaId`: number (ID da categoria)
* **Retorno**: Array de livros da categoria

## Autores

### Listar Todos os Autores
```typescript
const autores = await api.getAutores();
```
* **Método**: GET
* **Retorno**: Array de autores

### Listar Livros por Autor
```typescript
const livros = await api.getLivrosPorAutor(autorId);
```
* **Método**: GET
* **Parâmetros**:
  - `autorId`: number (ID do autor)
* **Retorno**: Array de livros do autor

## Reservas

### Listar Reservas do Usuário
```typescript
const reservas = await api.getReservasUsuario(usuarioId);
```
* **Método**: GET
* **Parâmetros**:
  - `usuarioId`: number (ID do usuário)
* **Retorno**: Array de reservas com detalhes dos livros

### Criar Nova Reserva
```typescript
const reserva = await api.criarReserva(usuarioId, livroId);
```
* **Método**: POST
* **Parâmetros**:
  - `usuarioId`: number (ID do usuário)
  - `livroId`: number (ID do livro)
* **Retorno**: Confirmação da reserva

### Cancelar Reserva
```typescript
const response = await api.cancelarReserva(reservaId);
```
* **Método**: DELETE
* **Parâmetros**:
  - `reservaId`: number (ID da reserva)
* **Retorno**: Confirmação do cancelamento

## Interfaces

### Interface Livro
```typescript
interface Livro {
  livro_id: number;
  titulo: string;
  ano_publicacao: number;
  editora: string;
  categoria_id: number;
}
```

### Interface Categoria
```typescript
interface Categoria {
  categoria_id: number;
  nome: string;
}
```

### Interface Autor
```typescript
interface Autor {
  autor_id: number;
  nome: string;
  nacionalidade: string | null;
}
```

### Interface Usuario
```typescript
interface Usuario {
  usuario_id: number;
  nome: string;
  email_principal: string;
  email_secundario?: string;
  telefone_principal: string;
  telefone_secundario?: string;
  senha: string;
}
```

### Interface Reserva
```typescript
interface Reserva {
  reserva_id: number;
  usuario_id: number;
  livro_id: number;
  data_reserva: Date;
  data_devolucao: Date;
}
```

## Exemplo de Uso

```typescript
// Exemplo de fluxo completo de uso da API

// 1. Login do usuário
const usuario = await api.login("email@exemplo.com", "senha123");

// 2. Listar categorias disponíveis
const categorias = await api.getCategorias();

// 3. Buscar livros de uma categoria específica
const livrosDaCategoria = await api.getLivrosPorCategoria(categorias[0].categoria_id);

// 4. Fazer uma reserva
const novaReserva = await api.criarReserva(usuario.usuario_id, livrosDaCategoria[0].livro_id);

// 5. Listar reservas do usuário
const minhasReservas = await api.getReservasUsuario(usuario.usuario_id);

// 6. Cancelar uma reserva
await api.cancelarReserva(minhasReservas[0].reserva_id);
```

## Observações Importantes

1. Todas as chamadas à API são assíncronas e retornam Promises
2. É necessário tratar os erros adequadamente usando try/catch
3. A autenticação é necessária para a maioria das operações
4. As reservas têm duração padrão de 7 dias
5. Um usuário pode ter múltiplas reservas ativas

## Tratamento de Erros

Exemplo de tratamento de erros:

```typescript
try {
  const livros = await api.getLivros();
  // Processar os livros
} catch (error) {
  if (error instanceof Error) {
    console.error('Erro ao buscar livros:', error.message);
  }
  // Tratar o erro adequadamente
}
``` 