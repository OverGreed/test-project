import { Pool } from 'pg';

export const db = new Pool({
    connectionString: process.env.DATABASE_URL,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});
