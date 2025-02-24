# My Library

## Telas
- Tela de Login 
- Tela de Cadastro 
- Tela Home 
- Tela de Livros 
- Tela de Autores 
- Tela de Categorias 
- Tela de Minhas Reservas 

### Tela de Login
- [X] Criar tela de login
    - [X] Background cor #E3EBF6
    - [X] Card branco centralizado com borda arredondada, sombra
    - [X] Logo no topo do card
    - [X] Formulário de login 
        - [X] Email
        - [X] Senha
        - [X] Botão de login
        - [X] Separador de linha
        - [X] Botão de cadastro


### Tela de Cadastro
- [X] Criar tela de cadastro
    - [X] Background cor #E3EBF6
    - [X] Card branco centralizado com borda arredondada, sombra
    - [X] Logo no topo do card
    - [X] Formulário de cadastro (Stepper)
        - [X] Passo 1
            - [X] Nome
            - [X] Email Principal
            - [X] Email Secundário
        - [X] Passo 2
            - [X] Número de telefone principal 
            - [X] Número de telefone secundário
        - [X] Passo 3
            - [X] Senha
            - [X] Confirmar senha
            - [X] Botão de cadastro
 
### Tela Home
- [X] Criar tela home
    - [X] Background cor #F7F1E1
    - [X] Header
        - [X] Background cor #303A6B
        - [X] Logo
        - [X] Ícone de usuário
    - [X] Seção Livros
        - [X] Grid com 5 cards de livros(quando clicar no card aparece o modal de reservar)
        - [X] Botão ao lado desse grid "Ver mais"
    - [X] Seção de categorias
        - [X] Grid com 5 cards de categorias(quando clicar no card me leva para a tela de livros da categoria)
        - [X] Botão ao lado desse grid "Ver mais"
    - [X] Seção de autores
        - [X] Grid com 5 cards de autores(quando clicar no card me leva para a tela de livros do autor)
        - [X] Botão ao lado desse grid "Ver mais"
    - [X] Footer
        - [X] Background cor #303A6B
        - [X] Texto branco
        - [X] Logo
        - [X] Texto "Todos os direitos reservados"

### Tela de Livros
- [X] Criar tela de livros
    - [X] Background cor #F7F1E1
    - [X] Header
        - [X] Background cor #303A6B
        - [X] Logo
        - [X] Ícone de usuário
    - [X] Botão de voltar
    - [X] Seção de livros
        - [X] Grid com 5 cards de livros por linha(quando clicar no card aparece o modal de reservar)
    - [X] Footer
        - [X] Background cor #303A6B
        - [X] Texto branco
        - [X] Logo
        - [X] Texto "Todos os direitos reservados"

### Tela de Autores
- [X] Criar tela de livros do autor
    - [X] Background cor #F7F1E1
    - [X] Header
        - [X] Background cor #303A6B
        - [X] Logo
        - [X] Ícone de usuário
    - [X] Botão de voltar
    - [X] Seção de livros
        - [X] Grid com 5 cards de livros por linha(quando clicar no card aparece o modal de reservar)
    - [X] Footer
        - [X] Background cor #303A6B
        - [X] Texto branco
        - [X] Logo
        - [X] Texto "Todos os direitos reservados"

### Tela de Categorias
- [X] Criar tela de livros da categoria
    - [X] Background cor #F7F1E1
    - [X] Header
        - [X] Background cor #303A6B
        - [X] Logo
        - [X] Ícone de usuário
    - [X] Botão de voltar
    - [X] Seção de livros
        - [X] Grid com 5 cards de livros por linha(quando clicar no card aparece o modal de reservar)
    - [X] Footer
        - [X] Background cor #303A6B
        - [X] Texto branco
        - [X] Logo
        - [X] Texto "Todos os direitos reservados"

### Tela de Minhas Reservas
- [X] Criar tela de minhas reservas
    - [X] Background cor #F7F1E1
    - [X] Header
        - [X] Background cor #303A6B
        - [X] Logo
        - [X] Ícone de usuário
    - [X] Botão de voltar
    - [X] Seção de usuário
        - [X] Icone de Avatar
        - [X] Nome do usuário
        - [X] Email Principal do usuário
        - [X] Email Secundário do usuário
        - [X] Número de telefone principal do usuário
        - [X] Número de telefone secundário do usuário
    - [X] Seção de reservas
        - [X] Table com as reservas do usuário
            - [X] Coluna 1: Título
            - [X] Coluna 2: Data de Reserva
            - [X] Coluna 3: Data de Entrega
            - [X] Coluna 4: Ações (Cancelar Reserva)
    - [X] Footer
        - [X] Background cor #303A6B
        - [X] Texto branco
        - [X] Logo
        - [X] Texto "Todos os direitos reservados"

### Modal de Reservar
- [X] Criar modal de reservar
    - [X] Background branco
    - [X] Card com borda arredondada, sombra
    - [X] Passo 1
    - [X] Título "Deseja reservar?"
    - [X] Imagem do livro
    - [X] Título do livro
    - [X] Autor do livro
    - [X] Botão de não vermelho, sai do modal
    - [X] Botão de sim verde, vai para o proximo passo
    - [X] Passo 2
        - [X] Formulário de reserva
            - [X] Título "Selecione as datas"
            - [X] Data de reserva
            - [X] Data de entrega
        - [X] Botão de cancelar vermelho, sai do modal
        - [X] Botão de reservar verde, reserva o livro

### Modal de Cancelar Reserva
- [X] Criar modal de cancelar reserva
    - [X] Background branco
    - [X] Card com borda arredondada, sombra
    - [X] Título "Deseja cancelar a reserva?"
    - [X] Botão de cancelar vermelho, sai do modal
    - [X] Botão de sim verde, cancela a reserva

## Integração com API
- [ ] Criar integração com API
    - [ ] Login
    - [ ] Cadastro
    - [ ] Reservas
    - [ ] Cancelar Reserva
    - [ ] Livros
    - [ ] Autores
    - [ ] Categorias

## Etapas para integração com API
- [] Criar uma pasta chamada "services"
- [] Criar um arquivo chamado "api.ts"
- [] Criar funções para cada uma das operações que iremos precisar
    - [] Login
    - [] Cadastro
    - [] Reservas
    - [] Cancelar Reserva
    - [] Livros
    - [] Autores
    - [] Categorias
- [] Substituir as mocks de dados por chamadas à API

## Importante
- Iremos usar o use-form para criar os formulários
- Atente-se ao API-MANUAL para a forma de uso da API do back-end
- Vamos usar o mantine/ui para os componentes
- Vamos usar o tailwindcss para o estilo

