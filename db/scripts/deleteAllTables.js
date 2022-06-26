import pool from '../index.js';

async function deleteAllTables() {
  await pool.query(
    `DROP TABLE IF EXISTS profile, notes, help, resource, topic`
  );
}

//THIS FUNCTION DELETES ALL TABLES IN THE DATABASE, USE CAREFULLY ⚠⚠⚠
deleteAllTables();
