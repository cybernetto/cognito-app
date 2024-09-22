import Router from 'koa-router';
import { signInOrRegister } from '../controllers/authController';

const router = new Router();

/**
 * @swagger
 * /auth:
 *   post:
 *     summary: Signin or Signup
 *     description: Any person can create, login and confirm email using this endpoint.
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email of the user
 *               password:
 *                 type: string
 *                 description: Password of the user
 *               confirm_password:
 *                 type: string
 *                 description: Retype password of the user
 *               confirm_code:
 *                 type: string
 *                 description: Confirmation code sended to email after user creation
 *               
 *     responses:
 *       200:
 *         description: User created sucessfull
 *       500:
 *         description: Error creating user
 */
router.post('/auth', signInOrRegister);

export default router;

