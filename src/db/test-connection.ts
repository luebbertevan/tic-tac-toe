// bun run src/db/test-connection.ts

import { db } from './db';
import { sql } from 'drizzle-orm';

async function testConnection() {
  try {
    // SELECT NOW() returns array of row objects directly
    const result = await db.execute(sql`SELECT NOW() AS now;`);
    console.log('Database connection successful:', result); 
  } catch (err) {
    console.error('Database connection failed:', err);
  }
}

testConnection();
