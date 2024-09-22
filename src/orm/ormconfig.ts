import { DataSource } from 'typeorm';
import { User } from '../models/user';

const host = process.env.POSTGRES_HOST || 'localhost';
const port = parseInt(process.env.POSTGRES_PORT || '5432', 10);
const username = process.env.POSTGRES_USER || 'yourusername';
const password = process.env.POSTGRES_PASSWORD || 'yourpassword';
const database = process.env.POSTGRES_DB || 'yourdbname';

console.log('Connecting to database with the following configuration:');
console.log(`Host: ${host}`);
console.log(`Port: ${port}`);
console.log(`Username: ${username}`);
console.log(`Database: ${database}`);

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: host,
  port: port,
  username: username,
  password: password,
  database: database,
  synchronize: true,
  entities: [User],
});
