import { Sequelize } from "sequelize";
import "dotenv/config";

const { DB_HOST, DB_NAME, DB_USERNAME, DB_PASSWORD, DB_DIALECT } = process.env;

const db = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOST,
  dialect: DB_DIALECT,
});

export default db;
