import { Context, Next } from 'koa';
import jwt from 'jsonwebtoken';
import jwkToPem from 'jwk-to-pem';
import axios from 'axios';
import { User } from '../models/user';
import { AppDataSource } from '../orm/ormconfig';
import dotenv from 'dotenv';

dotenv.config();

const poolData = {
  UserPoolId: process.env.COGNITO_USER_POOL_ID || "",
  ClientId: process.env.COGNITO_CLIENT_ID || "",
};

// Função para obter as chaves JWKs do AWS Cognito
const getJwks = async () => {
  const url = `https://cognito-idp.us-east-2.amazonaws.com/${poolData.UserPoolId}/.well-known/jwks.json`;
  const response = await axios.get(url);
  return response.data.keys;
};

// Função para verificar o token JWT
const verifyToken = async (token: string) => {
  const decodedHeader = jwt.decode(token, { complete: true })?.header;
  
  if (!decodedHeader) {
    throw new Error('Token inválido');
  }

  // Obtém as chaves JWKs
  const keys = await getJwks();
  const key = keys.find((k: { kid: string | undefined; }) => k.kid === decodedHeader.kid);

  if (!key) {
    throw new Error('Chave não encontrada');
  }

  // Converte a JWK para PEM
  const pem = jwkToPem(key);

  // Verifica o token usando a chave PEM
  return new Promise((resolve, reject) => {
    jwt.verify(token, pem, { algorithms: ['RS256'] }, (err, decodedToken) => {
      if (err) {
        reject(err);
      } else {
        resolve(decodedToken);
      }
    });
  });
};

// Middleware Koa para autenticar o token
export const authMiddleware = (requiredRole?: string) => {
  return async (ctx: Context, next: Next) => {
    const authHeader = ctx.headers.authorization;
    if (!authHeader) {
      ctx.status = 401; // Unauthorized
      ctx.body = 'Acesso não autorizado';
      return;
    }

    const token = authHeader.split(' ')[1]; // Extrai o token da string "Bearer <token>"
    
    try {
      const decodedToken = await verifyToken(token);
      ctx.state.user = decodedToken; // Armazena o token decodificado no estado do contexto


      //Consulta role do banco de dados, mas o ideal seria usar as permissões/grupos do proprio COGNITO 
      const userRepository = AppDataSource.getRepository(User);
      const users = await userRepository.findOneBy({ cognitoId: ctx.state.user.username  })

      // Verifica a role se for fornecida
      var current_role = users?.role
      if (current_role !== requiredRole) {
        ctx.status = 403; // Forbidden
        ctx.body = 'Acesso negado';
        return;
      }

      await next(); // Continua para o próximo middleware ou rota
    } catch (err) {
      console.error('Token inválido:', err);
      ctx.status = 401; // Unauthorized
      ctx.body = 'Token inválido';
    }
  };
};
