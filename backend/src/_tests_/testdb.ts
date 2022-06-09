//* **************************************
// File is for the Testing DB
//* **************************************
console.log('file')
import fs from 'fs';
import {Pool}  from 'pg';
import * as dotenv from 'dotenv';
dotenv.config();
process.env.POSTGRES_DB = 'test';
const pool = new Pool({
  host: 'postgres',
  port: 5432,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
});

const run = async (file: string) => {
  const content = fs.readFileSync(file, 'utf8');
  const statements = content.split(';');
  for (const statement of statements) {
    await pool.query(statement);
  }
};

export const reset = async () => {
  await run('sql/schema.sql');
  await run('sql/data.sql');
  await run('sql/indexes.sql');
};
