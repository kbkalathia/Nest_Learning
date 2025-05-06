import * as dotenv from 'dotenv';
import { SequelizeOptions } from 'sequelize-typescript';
import { Dialect } from 'sequelize';

dotenv.config({
  path: '.env.local',
});

export const sequelizeConfig: SequelizeOptions = {
  dialect: process.env.DB_DIALECT as Dialect,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT as any),
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  logging: false,
};
