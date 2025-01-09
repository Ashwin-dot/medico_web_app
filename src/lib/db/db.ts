// import { config } from 'dotenv';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

// config({ path: '.env' }); // or .env.local

const queryString = process.env.DATABASE_URL;
export const connection = postgres(queryString!);
export const db = drizzle(connection)
