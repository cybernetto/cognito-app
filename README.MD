# 🏗️ Backend Challenge - Caveo 🚀

Este é um teste de backend desenvolvido para a **Caveo**, utilizando **Node.js**, **KoaJS**, **TypeScript**, **PostgreSQL** e **TypeORM**.

Powered by Raimundo.

---
## DESAFIO

# Tarefas do Projeto

- [x] Configure um novo repositório Node.js.
- [x] Utilize o framework KoaJS.
- [x] Adicione TypeORM para gerenciar o banco de dados.
- [x] Utilize PostgreSQL como banco de dados relacional.
- [x] Utilize Typescript.
- [x] Criação de tabela User.
- [ ] Criação de um docker compose.
- [x] Criação de middleware.
- [x] Reação a permissões: user e admin.
- [x] Rota auth.
- [x] Rota users.
- [ ] Rota editAccount.
- [ ] Documentação Postman/Swagger.
- [ ] Testes Unitários.
- [x] ~~Pequenos commits.~~


## 🚀 Como Executar

### Pré-requisitos

- [asdf](https://asdf-vm.com/guide/getting-started.html) para gerenciar a versão do Node.js
- **Node.js 20.9.0** (gerenciado via asdf)
- [npm](https://www.npmjs.com/get-npm) ou [yarn](https://yarnpkg.com/getting-started)
- [PostgreSQL](https://www.postgresql.org/)
- Docker (opcional)

### Passo a Passo
0. **Se não quiser configurar o postgresSQL é so manter as variaveis padrões e fazer o deploy no docker:**
   ```bash
   docker run --name my-postgres -e POSTGRES_USER=yourusername -e POSTGRES_PASSWORD=yourpassword -e POSTGRES_DB=yourdbname -p 5432:5432 -d postgres
   ```
1. **Instale a versão correta do Node.js com asdf:**

   ```bash
   asdf install nodejs 20.9.0
   ```

2. **Clone o repositório:**

   ```bash
   git clone https://github.com/seu-usuario/backend-challenge.git
   cd backend-challenge
   ```

3. **Instale as dependências:**

   ```bash
   npm install
   ```

4. **Configure o banco de dados:**

   Crie um banco de dados PostgreSQL e ajuste as configurações no arquivo `.env`.

5. **Inicie o servidor de desenvolvimento:**

   ```bash
   npm run dev
   ```

6. **Rodar com Docker (opcional):**

   ```bash
   docker-compose up
   ```

---

## Dependências

- **koa**: Framework web leve para Node.js
- **koa-router**: Middleware para criação de rotas
- **TypeORM**: ORM para conexão com PostgreSQL
- **pg**: Cliente PostgreSQL para Node.js
- **typescript**: Superset de JavaScript com tipagem estática

---

## Documentação

A documentação das rotas pode ser acessada via **Swagger/Postman**.

- [Swagger](https://swagger.io/tools/swagger-ui/)
- [Postman](https://www.postman.com/)

---

## Revisado por ChatGPT 🤖
``` 
