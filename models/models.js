import pool from '../db/index.js';

export async function getProfiles() {
  const res = await pool.query(`SELECT * FROM profile;`);
  return res.rows;
}

export async function getProfileByUserId(id) {
  const res = await pool.query(`SELECT * FROM profile WHERE userID = $1;`, [
    id,
  ]);
  return res.rows;
}
export async function getProfileByEmail(email) {
  const res = await pool.query(`SELECT * FROM profile WHERE email = $1;`, [
    email,
  ]);
  return res.rows;
}
export async function getNotes() {
  const res = await pool.query(`SELECT * FROM notes;`);
  return res.rows;
}

export async function getNotesbyEmail(email) {
  const res = await pool.query(
    `SELECT slackUsername, week, day, tags, note from notes join profile on notes.userID=profile.userID where email=$1 order by week asc, day asc;`,
    [email]
  );
  return res.rows;
}

export async function getNotesByNotesID(id) {
  const res = await pool.query(`SELECT * FROM notes WHERE notesID = $1;`, [id]);
  return res.rows;
}
// Need to double check the SQL syntax to see if this is correct -> how do you parse a text array
export async function getNotesByTag(searchTerm) {
  const res = await pool.query(
    `SELECT * FROM notes WHERE LOWER(tags) LIKE LOWER('%' || $1 || '%');`,
    [searchTerm]
  );
  return res.rows;
}

export async function getHelp() {
  const res = await pool.query(`SELECT * FROM help;`);
  return res.rows;
}

export async function getHelpByHelpID(id) {
  const res = await pool.query(`SELECT * FROM help WHERE helpID = $1;`, [id]);
  return res.rows;
}

export async function getHelpByTopic(topic) {
  console.log(topic);
  const res1 = await pool.query(
    `Select topicID from topic as t where lower(t.topic)=$1 ;`,
    [topic]
  );
  let result = res1.rows[0];
  if (result.topicid === undefined) {
    result.topicid = '1';
  }
  const res = await pool.query(
    `SELECT profile.slackUsername FROM profile join help on profile.userID=help.userID where topicID = $1;`,
    [result.topicid]
  );
  return res.rows;
}

export async function getResource() {
  const res = await pool.query(`SELECT * FROM resource;`);
  return res.rows;
}
// This assumes that the tags in the database are all lowercase.
export async function getResourceByTag(searchTerm) {
  const res = await pool.query(
    `SELECT * FROM resource WHERE LOWER($1)=ANY(tags);`,
    [searchTerm]
  );
  return res.rows;
}
// This assumes that the tags in the database are all lowercase.
export async function getResourceByTagRating(searchTerm, rating) {
  const res = await pool.query(
    `SELECT * FROM resource WHERE LOWER($1)=ANY(tags) AND rating >= $2 order by rating desc;`,
    [searchTerm, rating]
  );
  return res.rows;
}
export async function getResourceByTopic(topicNum) {
  const res = await pool.query(`SELECT * FROM resource where topicID=$1;`, [
    topicNum,
  ]);
  return res.rows;
}
export async function getResourceByTopicRating(topicNum, rating) {
  const res = await pool.query(
    `SELECT * FROM resource where topicID=$1 AND rating>=$2 order by rating desc;`,
    [topicNum, rating]
  );
  return res.rows;
}

export async function getTopic() {
  const res = await pool.query(`SELECT * FROM topic;`);
  return res.rows;
}

export async function getTopicById(id) {
  const res = await pool.query(`SELECT * FROM topic WHERE topicID = $1;`, [id]);
  return res.rows;
}
// Need to double check the SQL syntax to see if this is correct
export async function getTopicByTag(searchTerm) {
  const res = await pool.query(
    `SELECT * FROM topic WHERE WHERE LOWER($1)=ANY(tags);`,
    [searchTerm]
  );
  return res.rows;
}
export async function newHelper(email, body) {
  console.log(body);
  const res1 = await pool.query('select userID from profile where email=$1', [
    email,
  ]);
  let id = res1.rows[0].userid;
  console.log(id);
  const res = await pool.query(
    'insert into help (userID, topicID) values ($1,$2) returning *;',
    [id, body.topicID]
  );
  return res.rows;
}

// Need to double check if we need the below models or not - Delete if needed from models & routers

// Need to double check the SQL syntax to see if this is correct
export async function createProfile(newProfile) {
  const res = await pool.query(
    `INSERT INTO profile (email, slackUsername) VALUES ($1, $2) RETURNING *;`,
    [newProfile.email, newProfile.slackUsername]
  );
  return res.rows;
}
// Need to double check the SQL syntax to see if this is correct
export async function updateProfileByUserId(id, updatedProfile) {
  const res = await pool.query(
    `UPDATE profile SET
            slakUsername = $1
        WHERE userID = $2 RETURNING *;`,
    [updatedProfile.slackUsername, id]
  );
  return res.rows;
}
export async function updateProfileByUserEmail(email, username) {
  const res = await pool.query(
    `UPDATE profile SET
            slackUsername = $1
        WHERE email = $2 RETURNING *;`,
    [username, email]
  );
  return res.rows;
}
export async function makeNote(email, body) {
  const idres = await pool.query('Select userID from profile where email=$1', [
    email,
  ]);
  let id = idres.rows[0].userid;
  const res = await pool.query(
    'INSERT into notes (userID,week,day,tags,note) VALUES ($1,$2,$3,$4,$5)',
    [id, body.week, body.day, body.tags, body.note]
  );

  return res.rows;
}
export async function getNewestNote(email) {
  const res = await pool.query(
    `SELECT week, day from profile join notes on profile.userID=notes.userID where email=$1 order by week desc limit 1;`,
    [email]
  );
  return res.rows;
}
// Need to double check the SQL syntax to see if this is correct
export async function deleteProfileByUserId(id) {
  const res = await pool.query(
    `DELETE FROM profile WHERE userID = $1 RETURNING *;`,
    [id]
  );
  return res.rows;
}

export async function createResource(newResource) {
  console.log('create resource called', newResource);
  const res = await pool.query(
    `INSERT INTO resource (userID, topicID, tags, link, rating) VALUES ($1, $2, $3, $4, $5) RETURNING *;`,
    [
      newResource.userID,
      newResource.topicID,
      newResource.tags,
      newResource.link,
      newResource.rating,
    ]
  );
  return res.rows;
}
