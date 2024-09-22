import { AppDataSource } from './ormconfig';

export const initializeDB = async () => {
  try {
    // Verifique se a conexão já está inicializada
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
      console.log('Database connected successfully');
    } else {
      console.log('Database already initialized');
    }
  } catch (error) {
    console.error('Error connecting to the database:', error);
    throw error; // Propague o erro
  }
};
