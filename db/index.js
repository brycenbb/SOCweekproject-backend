import pg from 'pg';
import { db } from '../config/index.js';

export default new pg.Pool({
  connectionString: db.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});
