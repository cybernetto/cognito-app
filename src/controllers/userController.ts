import { Context } from 'koa';
import { User } from '../models/user'; 
import { AppDataSource } from '../orm/ormconfig';
import { RequestBody } from '../interfaces/requestBody'
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

export const updateUser = async (ctx : Context) => {
    //put, update, get return all info
    const { name } = ctx.request.body as RequestBody
    try {
        const userRepository = AppDataSource.getRepository(User);
        //if admin
        //const users = await userRepository.update({name,role})
        const users = await userRepository.findOneBy({
                cognitoId: ctx.state.user.username,
        })
        //console.log(ctx.state.user)
        if (users){
            users.name = name;
            users.isOnboarded = true;
            userRepository.save(users)
            ctx.status = 200;
            ctx.body = {message: 'Update Successfull'}
        }else {
            ctx.status = 500;
            ctx.body = {message: 'User does not exist'}
        }
    } catch (error){
        console.error('Error updating user:', error);
        ctx.status = 500;
        ctx.body = {message: 'Error updating user', error}
    }
}

export const updateAnyUser = async (ctx : Context) => {
    //put, update, get return all info
    const { name, id, role } = ctx.request.body as RequestBody
    try {
        const userRepository = AppDataSource.getRepository(User);
        //if admin
        //const users = await userRepository.update({name,role})
        const users = await userRepository.findOneBy({
                cognitoId: id,
        })
        //console.log(ctx.state.user)
        if (users){
            users.name = name;
            users.role = role;
            userRepository.save(users)
            ctx.status = 200;
            ctx.body = {message: 'User updated Successfull'}
        }else {
            ctx.status = 500;
            ctx.body = {message: 'User does not exist'}
        }
    } catch (error){
        console.error('Error updating user:', error);
        ctx.status = 500;
        ctx.body = {message: 'Error updating user', error}
    }
}