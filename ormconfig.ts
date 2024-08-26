import { DataSource } from 'typeorm';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'pds_db',
  entities: ['dist/**/*.entity.js'],
  migrations: ['src/migrations/**/*.js'],
  synchronize: false,
  logging: true,
});

export default AppDataSource;
