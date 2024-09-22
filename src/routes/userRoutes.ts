import Router from 'koa-router';
import { getMe, getAllUsers,updateUser, updateAnyUser } from '../controllers/userController';
import { authMiddleware } from '../middleware/authMiddleware'; // Middleware de autenticação

const router = new Router();

/**
 * @swagger
 * /me:
 *   get:
 *     summary: Get user information
 *     description: Returns the authenticated user's information.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: User info returned successfully
 *       401:
 *         description: Unauthorized
 */
router.get('/me', authMiddleware(), getMe);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     description: Returns a list of all users (admin only).
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully returned user list
 *       403:
 *         description: Forbidden
 */
router.get('/users', authMiddleware('admin'), getAllUsers);

/**
 * @swagger
 * /users:
 *   put:
 *     summary: Update any user
 *     description: Admin can update user information.
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: Cognito ID of the user
 *               name:
 *                 type: string
 *                 description: New name of the user
 *               role:
 *                 type: string
 *                 description: New role of the user
 *     responses:
 *       200:
 *         description: User updated successfully
 *       500:
 *         description: Error updating user
 */
router.put('/users', authMiddleware('admin'), updateAnyUser);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Update self user
 *     description: Normal user can update self information (name).
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: New name of the user
 *     responses:
 *       200:
 *         description: User updated successfully
 *       500:
 *         description: Error updating user
 */
router.post('/update', authMiddleware(), updateUser )

export default router;

