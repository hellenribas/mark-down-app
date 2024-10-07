# Editor Colaborativo de Markdown em Tempo Real

Este projeto é um Editor Colaborativo de Markdown em Tempo Real, desenvolvido usando **React** no frontend e **Node.js** com **Express** e **Socket.IO** no backend. Usuários podem editar documentos simultaneamente, com atualizações em tempo real, autenticação de usuários, e edição colaborativa com cores diferentes para identificar quem está editando.

## Índice
- [Sobre o Projeto](#sobre-o-projeto)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Funcionalidades](#funcionalidades)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [Uso](#uso)
- [API - Endpoints](#api---endpoints)
  - [Autenticação](#autenticação)
  - [Documentos](#documentos)
- [Sockets](#sockets)
- [Segurança](#segurança)
- [Considerações Finais](#considerações-finais)

## Sobre o Projeto

Este é um editor colaborativo de Markdown que permite que múltiplos usuários editem um documento ao mesmo tempo, visualizando as alterações dos outros usuários em tempo real. Cada usuário é representado por uma cor única, e o backend gerencia autenticação e o armazenamento dos documentos.

## Tecnologias Utilizadas

- **Frontend**: React, JavaScript
- **Backend**: Node.js, Express, Socket.IO, Mongoose
- **Banco de Dados**: MongoDB
- **Segurança**: JWT, Helmet, Express Rate Limiter
- **Outras Dependências**: bcryptjs, express-validator

## Funcionalidades

- **Registro e Login de Usuários**: Criação de contas e autenticação usando JWT.
- **Edição em Tempo Real**: Atualização instantânea de conteúdo através de Socket.IO.
- **Controle de Versão**: Cada documento possui uma versão incremental que é atualizada a cada edição.
- **Cores de Usuário**: Cada usuário tem uma cor única para facilitar a identificação de quem está editando.
- **Documentos CRUD**: Criação, leitura, atualização e exclusão de documentos.

## Pré-requisitos

- Node.js instalado (versão 16+)
- MongoDB configurado
- NPM ou Yarn instalado

## Instalação

### Backend

1. Clone o repositório:

   ```bash
   git clone <link>
   cd markdown-app/backend
2. Instale as dependências:
   ```bash
   npm install
3. Crie um arquivo .env na raiz do projeto e adicione as seguintes variáveis:
   ```bash
   MONGO_URI=<URL_DE_CONEXÃO_DO_MONGO>
   JWT_SECRET=<SUA_CHAVE_SECRETA>
4. Execute o servidor:
   ```bash
   npm start:dev
   npm start
   
### Frontend

1. Vá para a pasta do frontend:
   ```bash
   cd ./frontend-app
2. Instale as dependências:
   ```bash
   npm install
3. Execute o projeto:
   ```bash
   npm start
  

### Uso

1. Acesse a aplicação através de `http://localhost:3000`.
2. Registre-se e faça login.
3. Crie um novo documento ou edite um documento existente.
4. Compartilhe o link do documento para colaborar em tempo real.

## API - Endpoints

### Autenticação

- **POST** `/api/auth/register`: Registrar um novo usuário.
- **POST** `/api/auth/login`: Login do usuário.

### Documentos

- **GET** `/api/documents`: Retorna todos os documentos.
- **POST** `/api/documents`: Cria um novo documento.
- **GET** `/api/documents/:id`: Retorna um documento específico.
- **PUT** `/api/documents/:id`: Atualiza um documento específico.
- **DELETE** `/api/documents/:id`: Deleta um documento específico.

## Sockets

- **joinDocument**: Evento para um usuário entrar na edição de um documento.
- **editDocument**: Evento para atualizar o conteúdo de um documento.
- **activeUsers**: Transmite para todos os usuários a lista de quem está atualmente editando o documento.

## Segurança

- **Autenticação**: Utilização de **JWT** para autenticar as rotas protegidas.
- **Helmet**: Proteção contra vulnerabilidades comuns ao utilizar o **Helmet**.
- **Rate Limiting**: Uso de **express-rate-limit** para limitar requisições e evitar ataques DoS.
- **Sanitização**: Uso de **express-validator** e **validator** para validar e sanitizar inputs de usuários.

## Demonstração

Você pode experimentar a aplicação em funcionamento acessando o seguinte link:

[**Demonstração do Editor Colaborativo de Markdown**](https://mark-down-front.vercel.app/)

Na demonstração, você poderá:

- Colaborar em tempo real com outros usuários.
- Testar a funcionalidade de autenticação com registro e login.

Sinta-se à vontade para explorar todas as funcionalidades e verificar como a aplicação pode atender às suas necessidades!

## Considerações Finais

Este projeto visa proporcionar um ambiente colaborativo de edição em tempo real, com foco em aprendizado e prototipação. No futuro, seria interessante integrar uma melhor gestão de permissões, uma UI/UX mais robusta e melhorias no sistema de segurança.

Se tiver alguma dúvida ou sugestão, sinta-se à vontade para contribuir ou abrir um **issue** no repositório.



   
