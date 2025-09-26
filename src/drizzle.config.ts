//In src so commands are
//bun drizzle-kit --config ./src/drizzle.config.ts generate
//bun drizzle-kit --config ./src/drizzle.config.ts migrate



import 'dotenv/config';             // load .env automatically
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/db/schema.ts',    
  out: './drizzle',               
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!, // your DATABASE_URL from .env
  },
});
