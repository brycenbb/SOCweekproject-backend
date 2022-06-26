import pool from '../index.js';
import { notes } from '../../libs/notes.js';
import { help } from '../../libs/help.js';
import { profile } from '../../libs/profile.js';
import { resource } from '../../libs/resource.js';
import { topic } from '../../libs/topic.js';
//PASS THE DATA AS ARRAY AS ARGUMENT INTO THE FUNCTIONS AT THE BOTOM OF THE DOCUMENT TO POPULATE THE TABLES

async function populateProfileTable(dataArr) {
  for (let i = 0; i < dataArr.length; i++) {
    const res = await pool.query(
      `INSERT INTO profile ( email, slackUsername) VALUES ($1, $2) RETURNING *;`,
      [dataArr[i].email, dataArr[i].slackUsername]
    );
    console.log(res.rows[0].email);
  }
}

async function populateNotesTable(dataArr) {
  for (let i = 0; i < dataArr.length; i++) {
    const res = await pool.query(
      `INSERT INTO notes ( userID, week, day, tags, note) VALUES ($1, $2, $3, $4, $5) RETURNING *;`,
      [
        dataArr[i].userID,
        dataArr[i].week,
        dataArr[i].day,
        dataArr[i].tags,
        dataArr[i].note,
      ]
    );
    console.log(res.rows[0].note);
  }
}
async function populateNotesTableFIX(dataArr) {
  for (let i = 0; i < dataArr.length; i++) {
    const res = await pool.query(
      `UPDATE notes SET note=$1 where userID=$2 RETURNING *;`,
      [dataArr[i].note, dataArr[i].userID]
    );
    console.log(res.rows[0].note);
  }
}

async function populateHelpTable(dataArr) {
  for (let i = 0; i < dataArr.length; i++) {
    const res = await pool.query(
      `INSERT INTO help ( userID, topicID) VALUES ($1, $2) RETURNING *;`,
      [dataArr[i].userID, dataArr[i].topicID]
    );
    console.log(res.rows[0].helpID);
  }
}

async function populateResourceTable(dataArr) {
  for (let i = 0; i < dataArr.length; i++) {
    const res = await pool.query(
      `INSERT INTO resource (userID, topicID, tags, link, rating) VALUES ($1, $2, $3, $4, $5) RETURNING *;`,
      [
        dataArr[i].userID,
        dataArr[i].topicID,
        dataArr[i].tags,
        dataArr[i].link,
        dataArr[i].rating,
      ]
    );
    console.log(res.rows[0].link);
  }
}

async function populateTopicTable(dataArr) {
  for (let i = 0; i < dataArr.length; i++) {
    const res = await pool.query(
      `INSERT INTO topic (week, day, topic, tags) VALUES ($1, $2, $3, $4) RETURNING *;`,
      [dataArr[i].week, dataArr[i].day, dataArr[i].topic, dataArr[i].tags]
    );
    console.log(res.rows[0].link);
  }
}

// populateProfileTable(profile);
// populateNotesTable(notes);
// populateHelpTable(help);
// populateResourceTable(resource);
populateTopicTable(topic);

// populateNotesTableFIX(notes);
