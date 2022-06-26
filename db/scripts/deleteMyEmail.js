import pool from '../index.js';

await pool.query('delete from profile where email=$1', [
  'sirpokemast2@gmail.com',
]);
