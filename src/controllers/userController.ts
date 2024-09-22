import { Context } from 'koa';
import { User } from '../models/user'; // Certifique-se de que o modelo de usuário está corretamente importado
import { AppDataSource } from '../orm/ormconfig'; // Certifique-se de que o caminho está correto

// Apenas um exemplo para retornar um "Hello User"
export const getMe = async (ctx: Context) => {
    // Extrair o nome do usuário a partir do token decodificado no middleware
    const user = ctx.state.user;
    const userName = user['username']; // Use o campo apropriado (nome ou email)
    
    // Retorna "Hello" seguido do nome do usuário
    ctx.body = `Hello ${userName}`;
};

// Exemplo de rota para admin

export const getAllUsers = async (ctx: Context) => {
    try {
        const userRepository = AppDataSource.getRepository(User); // Obtenha o repositório de usuários
        const users = await userRepository.find(); // Busque todos os usuários
        
        ctx.status = 200; // OK
        ctx.body = users; // Retorne a lista de usuários
    } catch (error) {
        console.error('Error fetching users:', error);
        ctx.status = 500; // Internal Server Error
        ctx.body = { message: 'Error fetching users' };
    }
};
