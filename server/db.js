/*
import mysql from "mysql2";

export const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});
*/

import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import pg from "pg";

export const db = new pg.Client(process.env.DATABASE_URL);

await db.connect();

//! IMPORTANT:
//! CocroachDB returns data.rows instead of just data
//! needed for register and login, as well as return data at the end of each controller
