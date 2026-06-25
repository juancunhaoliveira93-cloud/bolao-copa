# 🏆 Bolão da Copa - Sistema de Gerenciamento de Apostas

Um sistema web completo (Full-Stack) desenvolvido para gerenciamento de palpites em partidas de futebol. O projeto foi construído utilizando a stack **MEAN** (MongoDB, Express, Angular e Node.js), contando com painéis separados para usuários comuns e administradores.

## 🚀 Tecnologias Utilizadas

* **Frontend:** Angular (Standalone Components), TypeScript, HTML5, CSS3, Bootstrap 5.
* **Backend:** Node.js, Express.js.
* **Banco de Dados:** MongoDB (MongoDB Atlas) e Mongoose.
* **Segurança:** Criptografia de senhas com `bcrypt` e autenticação com `jsonwebtoken` (JWT).

## 📁 Estrutura do Projeto

O repositório está dividido em duas partes principais:

* `/backend`: Contém a API RESTful, modelos de banco de dados, controladores e rotas de autenticação, partidas e palpites.
* `/frontend`: Contém a aplicação (SPA - Single Page Application) consumindo a API, com telas de login, dashboard do apostador e painel de administração.

## ⚙️ Pré-requisitos

Antes de começar, você precisará ter instalado em sua máquina:
* [Node.js](https://nodejs.org/) (versão 18 ou superior)
* [Angular CLI](https://angular.io/cli) (`npm install -g @angular/cli`)
* Uma conta no [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) com um cluster configurado.

## 🛠️ Como executar o projeto

### 1. Configurando o Backend
   1. Abra um terminal e navegue até a pasta do servidor:
   ```bash
   cd backend
   
   1. Instale as dependências:
   npm install

   2. Crie um arquivo .env na raiz da pasta backend com as seguintes variáveis:
    PORT=3000
    MONGO_URI=Sua_String_De_Conexao_Do_MongoDB_Aqui
    JWT_SECRET=sua_chave_secreta_aqui
   
   3. Inicie o servidor:
   node server.js
   O servidor rodará em http://localhost:3000

### 2. Configurando o Frontend
    1. Abra um novo terminal e navegue até a pasta da aplicação visual:
    cd frontend

    2. Instale as dependências:
    npm install

    3. Inicie o servidor de desenvolvimento do Angular:
    ng serve

    4. Acesse a aplicação no navegador em: http://localhost:4200

👥 Perfis de Usuário e Casos de Uso
A aplicação possui dois níveis de acesso baseados em Roles:

1. Apostador (Usuário Comum)

Pode criar uma conta e fazer login.

Visualiza a lista de jogos disponíveis (cadastrados pelo Admin).

Pode registrar seus palpites (placares) antes do jogo ser encerrado.

2. Administrador

Acessa uma área restrita (Painel do Administrador).

Pode cadastrar novas partidas (Times e Data/Hora).

Lança o resultado oficial das partidas, encerrando-as para novos palpites.

Nota para desenvolvedores: Por padrão, todo novo usuário cadastrado pela interface recebe a permissão de usuário comum (role: 'user'). Para testar a área de administrador, acesse o seu banco de dados no MongoDB Atlas e altere manualmente o campo role de um usuário específico para 'admin'.

👨‍💻 Autor
Desenvolvido por Juan Carlos Oliveira da Cunha 


