
import { defineConfig } from 'drizzle-kit';


console.log(process.env.DATABASE_URL);
export default defineConfig({
    schema: './src/db/schemas.ts',
    out: './supabase/migrations',
    dialect: 'postgresql',
    dbCredentials: {
      // url: process.env.DATABASE_URL as string ,
      url: "postgresql://postgres:Aka@123456@db.tellnmptjfyilvdelwzv.supabase.co:5432/postgres" ,
    },
  });