import 'dotenv/config';
import { DataSource } from 'typeorm';

const connection = new DataSource({
  type: 'postgres',
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  entities: ['src/**/entities/*.ts'],
  migrations: ['src/database/typeorm/migration/*.{js,ts}'],
  migrationsTableName: 'migrations',
  synchronize: false,
});

connection.initialize();

export { connection };
