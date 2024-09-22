import Router from 'koa-router';
import { getMe, getAllUsers } from '../controllers/userController';
import { authMiddleware } from '../middleware/authMiddleware'; // Middleware de autenticação

const router = new Router();

// Rota protegida por JWT (será implementado no middleware)
router.get('/me', authMiddleware(), getMe);

// Rota para admins, também protegida
router.get('/users', authMiddleware('admin'), getAllUsers);

export default router;

