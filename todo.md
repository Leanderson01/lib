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
- [ ] Criar tela de livros
    - [ ] Background cor #F7F1E1
    - [ ] Header
        - [ ] Background cor #303A6B
        - [ ] Logo
        - [ ] Ícone de usuário
    - [ ] Botão de voltar
    - [ ] Seção de livros
        - [ ] Grid com 5 cards de livros por linha(quando clicar no card aparece o modal de reservar)
    - [ ] Footer
        - [ ] Background cor #303A6B
        - [ ] Texto branco
        - [ ] Logo
        - [ ] Texto "Todos os direitos reservados"

### Tela de Autores
- [ ] Criar tela de livros do autor
    - [ ] Background cor #F7F1E1
    - [ ] Header
        - [ ] Background cor #303A6B
        - [ ] Logo
        - [ ] Ícone de usuário
    - [ ] Botão de voltar
    - [ ] Seção de livros
        - [ ] Grid com 5 cards de livros por linha(quando clicar no card aparece o modal de reservar)
    - [ ] Footer
        - [ ] Background cor #303A6B
        - [ ] Texto branco
        - [ ] Logo
        - [ ] Texto "Todos os direitos reservados"

### Tela de Categorias
- [ ] Criar tela de livros da categoria
    - [ ] Background cor #F7F1E1
    - [ ] Header
        - [ ] Background cor #303A6B
        - [ ] Logo
        - [ ] Ícone de usuário
    - [ ] Botão de voltar
    - [ ] Seção de livros
        - [ ] Grid com 5 cards de livros por linha(quando clicar no card aparece o modal de reservar)
    - [ ] Footer
        - [ ] Background cor #303A6B
        - [ ] Texto branco
        - [ ] Logo
        - [ ] Texto "Todos os direitos reservados"

### Tela de Minhas Reservas
- [ ] Criar tela de minhas reservas
    - [ ] Background cor #F7F1E1
    - [ ] Header
        - [ ] Background cor #303A6B
        - [ ] Logo
        - [ ] Ícone de usuário
    - [ ] Botão de voltar
    - [] Seção de usuário
        - [ ] Icone de Avatar
        - [ ] Nome do usuário
        - [ ] Email Principal do usuário
        - [ ] Email Secundário do usuário
        - [ ] Número de telefone principal do usuário
        - [ ] Número de telefone secundário do usuário
    - [ ] Seção de reservas
        - [ ] Table com as reservas do usuário
            - [ ] Coluna 1: Título
            - [ ] Coluna 2: Data de Reserva
            - [ ] Coluna 3: Data de Entrega
            - [ ] Coluna 4: Ações (Cancelar Reserva)
    - [ ] Footer
        - [ ] Background cor #303A6B
        - [ ] Texto branco
        - [ ] Logo
        - [ ] Texto "Todos os direitos reservados"

### Modal de Reservar
- [ ] Criar modal de reservar
    - [ ] Background branco
    - [ ] Card com borda arredondada, sombra
    - [ ] Passo 1
    - [ ] Título "Deseja reservar?"
    - [ ] Imagem do livro
    - [ ] Título do livro
    - [ ] Autor do livro
    - [ ] Botão de não vermelho, sai do modal
    - [ ] Botão de sim verde, vai para o proximo passo
    - [ ] Passo 2
        - [ ] Formulário de reserva
            - [ ] Título "Selecione as datas"
            - [ ] Data de reserva
            - [ ] Data de entrega
        - [ ] Botão de cancelar vermelho, sai do modal
        - [ ] Botão de reservar verde, reserva o livro

### Modal de Cancelar Reserva
- [ ] Criar modal de cancelar reserva
    - [ ] Background branco
    - [ ] Card com borda arredondada, sombra
    - [ ] Título "Deseja cancelar a reserva?"
    - [ ] Botão de cancelar vermelho, sai do modal
    - [ ] Botão de sim verde, cancela a reserva

## Importante
- Iremos usar o use-form para criar os formulários
- Atente-se ao API-MANUAL para a forma de uso da API do back-end
- Vamos usar o mantine/ui para os componentes
- Vamos usar o tailwindcss para o estilo

