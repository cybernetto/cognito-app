import Router from 'koa-router';
import { signInOrRegister } from '../controllers/authController';

const router = new Router();

// Rota pública para sign-in/register
router.post('/auth', signInOrRegister);

export default router;

