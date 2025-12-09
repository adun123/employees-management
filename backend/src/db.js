import dotenv from "dotenv";
dotenv.config();  // load env di sini juga

import pkg from "pg";
const { Pool } = pkg;

console.log("DB URL:", process.env.DATABASE_URL);

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});
console.log("Connecting to DB with:");
console.log({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  database: process.env.DB_NAME
});


export default pool;
