import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import { initializeDB } from './orm/connection';
import swaggerRouter from './swagger'

const app = new Koa();

// Middleware para body parsing
app.use(bodyParser());

// Inicializar o banco de dados
initializeDB();

// Rotas
app.use(authRoutes.routes());
app.use(userRoutes.routes());
app.use(swaggerRouter.routes());

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
