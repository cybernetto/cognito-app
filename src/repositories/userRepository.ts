import { AppDataSource } from '../orm/ormconfig';
import { User } from '../models/user';

const userRepository = AppDataSource.getRepository(User);

export const createUser = async (userData: Partial<User>): Promise<User> => {
  const newUser = userRepository.create(userData);
  return await userRepository.save(newUser);
};

export const findUserByCognitoId = async (cognitoId: string): Promise<User | null> => {
  return await userRepository.findOne({ where: { cognitoId } });
};

export const updateUser = async (id: string, userData: Partial<User>): Promise<User> => {
  await userRepository.update(id, userData);
  return await userRepository.findOneBy({ id });
};

export const deleteUser = async (id: string): Promise<void> => {
  await userRepository.softDelete(id);
};
