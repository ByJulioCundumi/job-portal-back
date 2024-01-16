import { config } from "dotenv";
config();

export const PORT = parseInt(process.env.PORT as string) || 3000;
export const HOST = process.env.HOST || "localhost";
export const DB_PORT = parseInt(process.env.DB_PORT as string) || 3306;
export const DB_HOST = process.env.DB_HOST || "localhost";
export const DB_USERNAME = process.env.DB_USERNAME || "job-portal-username";
export const DB_PASSWORD = process.env.DB_PASSWORD || "portal-password";
export const DB_NAME = process.env.DB_NAME || "job-portal";
export const SECRECT_KEY = process.env.SECRECT_KEY || "SecreDJklf";
