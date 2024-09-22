Aqui está uma versão revisada e mais profissional do seu arquivo README.md:

---

# 🏗️ **Backend Challenge - Caveo** 🚀

Este projeto é um desafio de backend desenvolvido para a **Caveo**, utilizando **Node.js**, **KoaJS**, **TypeScript**, **PostgreSQL** e **TypeORM**.

Desenvolvido por Raimundo.

---

## 📝 **Descrição do Desafio**

O objetivo deste projeto é criar uma aplicação backend com controle de autenticação, autorização e gerenciamento de usuários, seguindo as melhores práticas de desenvolvimento.

---

## 📋 **Tarefas do Projeto**

- [x] Configuração inicial de repositório Node.js.
- [x] Utilização do framework KoaJS.
- [x] Configuração do TypeORM para gerenciamento de banco de dados.
- [x] Integração com PostgreSQL como banco de dados relacional.
- [x] Desenvolvimento utilizando TypeScript.
- [x] Criação da tabela `User`.
- [x] Configuração de Docker Compose.
- [x] Implementação de middleware de autenticação e autorização.
- [x] Controle de permissões para usuários: `user` e `admin`.
- [x] Implementação da rota `auth`.
- [x] Implementação da rota `users`.
- [x] Implementação da rota `editAccount`.
- [x] Documentação via Postman/Swagger.
- [ ] Desenvolvimento de testes unitários.
- [x] ~~Pequenos commits frequentes~~.
- [ ] Otimização de funções e aplicação de clean code.

---

## 🗺️ **Mapa de Tarefas**

Você pode visualizar o progresso do projeto diretamente no **Miro**:  
[Veja o Mapa de Tarefas no Miro](https://miro.com/app/embed/uXjVLcROrxE=/?pres=1&frameId=3458764600737919968&embedId=81780933623)

---

## 🚀 **Como Executar o Projeto**

### **Pré-requisitos**

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:

- [asdf](https://asdf-vm.com/guide/getting-started.html) para gerenciar a versão do Node.js.
- **Node.js 20.9.0** (gerenciado via asdf).
- [npm](https://www.npmjs.com/get-npm) ou [yarn](https://yarnpkg.com/getting-started) para gerenciar pacotes.
- [PostgreSQL](https://www.postgresql.org/), para o banco de dados.
- Docker (opcional, para ambiente de desenvolvimento isolado).

## 🐳 **Executar com Docker (opcional)**

**Rodar projeto com Docker:**

```bash
docker-compose up --build
```

**Caso prefira rodar o projeto via Docker de forma segregada:**

Executar o db imagem
```bash
docker run --name my-postgres -e POSTGRES_USER=yourusername -e POSTGRES_PASSWORD=yourpassword -e POSTGRES_DB=yourdbname -p 5432:5432 -d postgres
```

Buildar a imagem

```bash
docker build -t cognito-app .
```
Executar a imagem

```bash
docker run --name my-node-app-container --link my-postgres:postgres -e POSTGRES_HOST=postgres -p 3000:3000 -d cognito-app

```

----

### **Passo a Passo**

1. **Instale a versão correta do Node.js com asdf:**

   ```bash
   asdf install nodejs 20.9.0
   ```

2. **Clone o repositório:**

   ```bash
   git clone https://github.com/seu-usuario/backend-challenge.git
   cd backend-challenge
   ```

3. **Instale as dependências do projeto:**

   ```bash
   npm install
   ```

4. **Configure o banco de dados:**

   Crie um banco de dados PostgreSQL e ajuste as configurações no arquivo `.env`.

5. **Inicie o servidor de desenvolvimento:**

   ```bash
   npm run dev
   ```

---
## 📦 **Testes**
   ```bash
   npm run test
   ```
---

## 📦 **Dependências**

Este projeto utiliza as seguintes tecnologias e bibliotecas principais:

- **koa**: Framework web minimalista para Node.js.
- **koa-router**: Middleware de roteamento para Koa.
- **TypeORM**: ORM para TypeScript e JavaScript que suporta PostgreSQL.
- **pg**: Cliente PostgreSQL para Node.js.
- **typescript**: Superset de JavaScript com tipagem estática.

---

## 📄 **Documentação**

A documentação das rotas da API pode ser acessada via **Swagger** ou **Postman**:

- [Swagger](https://swagger.io/tools/swagger-ui/)
- [Postman](https://www.postman.com/)

---

## ⚡ **Aprimoramentos Futuros**

- Melhorias de performance e aplicação de padrões de clean code.
- Adição de testes unitários e de integração.
- Integração completa com Docker para facilitar o setup do ambiente.

---
