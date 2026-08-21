import { Pool } from "pg";
import { envs } from "./envs.js";

export const pool = new Pool({
    host: envs.DB_HOST,
    database: envs.DB_NAME,
    port: envs.DB_PORT,
    user: envs.DB_USER,
    password: envs.DB_PASSWORD
});