import { Context } from 'koa';
import { getMe, getAllUsers, updateUser, updateAnyUser } from '../controllers/userController'; 
import { AppDataSource } from '../orm/ormconfig'; 
import { User } from '../models/user';

jest.mock('../orm/ormconfig'); // Mock do AppDataSource
jest.mock('../models/user'); // Mock do modelo User

describe('User Controller', () => {
    beforeEach(() => {
        (AppDataSource.getRepository as jest.Mock).mockReturnValue({
            find: jest.fn(),
            findOneBy: jest.fn(),
            save: jest.fn()
        });
    });

    describe('getMe', () => {
        it('should return greeting with username', async () => {
            const ctx = {
                state: {
                    user: { username: 'testuser' }
                },
                body: ''
            } as Context;

            await getMe(ctx);

            expect(ctx.body).toEqual('Hello testuser');
        });
    });

    describe('getAllUsers', () => {
        it('should return all users', async () => {
            const ctx = {
                status: 0,
                body: null
            } as Context;

            // Simula o retorno do repositório de usuários
            const mockUsers = [{ name: 'User1' }, { name: 'User2' }];
            const userRepository = AppDataSource.getRepository(User);
            (userRepository.find as jest.Mock).mockResolvedValue(mockUsers);

            await getAllUsers(ctx);

            expect(ctx.status).toBe(200);
            expect(ctx.body).toEqual(mockUsers);
        });
    });

    describe('updateUser', () => {
        it('should update the user', async () => {
            const ctx = {
                request: { body: { name: 'Updated Name' } },
                state: { user: { username: 'testuser' } },
                status: 0,
                body: null
            } as Context;

            const userRepository = AppDataSource.getRepository(User);
            const mockUser = { name: 'Old Name', isOnboarded: false, cognitoId: 'testuser' };
            (userRepository.findOneBy as jest.Mock).mockResolvedValue(mockUser);
            (userRepository.save as jest.Mock).mockResolvedValue(mockUser);

            await updateUser(ctx);

            expect(ctx.status).toBe(200);
            expect(ctx.body).toEqual({ message: 'Update Successfull' });
            expect(mockUser.name).toBe('Updated Name');
            expect(mockUser.isOnboarded).toBe(true);
        });
    });

    describe('updateAnyUser', () => {
        it('should update any user', async () => {
            const ctx = {
                request: { body: { name: 'Updated Name', id: 'otheruser', role: 'admin' } },
                state: { user: { username: 'adminuser' } },
                status: 0,
                body: null
            } as Context;

            const userRepository = AppDataSource.getRepository(User);
            const mockUser = { name: 'Old Name', role: 'user', cognitoId: 'otheruser' };
            (userRepository.findOneBy as jest.Mock).mockResolvedValue(mockUser);
            (userRepository.save as jest.Mock).mockResolvedValue(mockUser);

            await updateAnyUser(ctx);

            expect(ctx.status).toBe(200);
            expect(ctx.body).toEqual({ message: 'User updated Successfull' });
            expect(mockUser.name).toBe('Updated Name');
            expect(mockUser.role).toBe('admin');
        });
    });
});
