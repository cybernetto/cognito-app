import { Context, Next } from 'koa';

// Middleware básico para autenticação com JWT
export const authMiddleware = async (ctx: Context, next: Next) => {
    // No futuro, aqui vai a verificação do JWT vindo do Cognito
    const token = ctx.headers.authorization;
    
    if (!token) {
        ctx.status = 401;
        ctx.body = 'Acesso não autorizado';
        return;
    }

    // Simular verificação do token
    // Se o token for válido, você chamaria `next()`
    await next();
};

