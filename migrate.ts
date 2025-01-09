// import { connection, db } from "@/db/index"
// import { migrate } from "drizzle-orm/postgres-js/migrator"

// (async()=>{
//     await migrate(db, { migrationsFolder: './supabase/migrations'})
//     await connection.end()
// })()


import { db, connection } from '@/lib/db/db';
import { migrate } from 'drizzle-orm/postgres-js/migrator';

(async () => {
    await migrate(db, { migrationsFolder: './supabase/migrations' });
    await connection
})();