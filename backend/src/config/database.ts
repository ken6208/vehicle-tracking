import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  throw new Error("DATABASE_URL is not set in .env file!");
}

const sequelize = new Sequelize(DATABASE_URL, {
  dialect: DATABASE_URL.startsWith("postgres") ? "postgres" : "mysql", // Auto-detect dialect
  dialectOptions: {
    ssl: process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : false, // SSL for production
  },
  logging: false, // Disable logging in production
});

export default sequelize;
