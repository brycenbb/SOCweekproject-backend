import pool from '../index.js';

await pool.query(
  `CREATE TABLE IF NOT EXISTS profile (userID INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY, email TEXT, slackUsername TEXT);`
);

await pool.query(
  `CREATE TABLE IF NOT EXISTS notes (notesID INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY, userID INT, week INT, day INT, tags TEXT [], note TEXT);`
);

await pool.query(
  `CREATE TABLE IF NOT EXISTS help (helpID INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY, userID INT, topicID INT);`
);

await pool.query(
  `CREATE TABLE IF NOT EXISTS resource (resourceID INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY, userID INT, topicID INT, tags TEXT [], link TEXT, rating INT);`
);

await pool.query(
  //"Create table if not exists topic (topicID int primary key generated always as identity,week int,day int, topic text, tags text [], happyToHelp int [])"
  `CREATE TABLE IF NOT EXISTS topic (topicID INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY, week INT, day INT, topic TEXT, tags TEXT []);`
);
