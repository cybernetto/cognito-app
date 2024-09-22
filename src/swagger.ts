import { koaSwagger } from 'koa2-swagger-ui';
import swaggerJsdoc from 'swagger-jsdoc';
import Router from 'koa-router';

const swaggerRouter = new Router();

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'My API',
    version: '1.0.0',
    description: 'API documentation for authentication and user management',
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Development server',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./src/routes/*.ts'],
};

const swaggerSpec = swaggerJsdoc(options);

// Defina a rota para exibir o Swagger UI
swaggerRouter.get('/docs', koaSwagger({ 
  routePrefix: false, 
  swaggerOptions: { 
    spec: swaggerSpec as Record<string, unknown>  // Coerção de tipo
  } 
}));

export default swaggerRouter;

