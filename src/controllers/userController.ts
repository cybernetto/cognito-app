import { Context } from 'koa';

// Apenas um exemplo para retornar um "Hello User"
export const getMe = async (ctx: Context) => {
    // Aqui você pode buscar os dados do usuário no banco de dados
    ctx.body = 'Hello User';
};

// Exemplo de rota para admin
export const getAllUsers = async (ctx: Context) => {
    // Buscar todos os usuários no banco de dados
    ctx.body = 'Hello Admin - List of all users';
};

