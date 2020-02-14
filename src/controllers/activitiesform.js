/* eslint-disable no-console */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
/* eslint-disable object-shorthand */
const express = require('express');
const moment = require('moment');
const dotenv = require('dotenv');

const router = express.Router();


const db = require('../dbs/index');

async function createReport(req, res, gifUrl) {
    const createUser = `INSERT INTO
    reportactivities(rid, pid, date, activity, outcome, imgurl)
    VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
  
  const values = [
  req.body.rid,
  req.body.pid,
  moment(new Date()),
  req.body.activity,
  req.body.outcome,
  gifUrl,
    ];
  try {
  const { rows } = await db.query(createUser, values);
  // console.log(rows);
  
  return res.status(201).send(rows);
  } catch (error) {
  return res.status(400).send(error);
  }
}

async function createActivity(req, res) {
    console.log(req.body)
    const createUser = `INSERT INTO
    reportactivities(pid, date, activity, outcome,rid)
    VALUES ($1, $2, $3, $4, $5) RETURNING *`;
  
  const values = [
  req.body.pid,
  req.body.date,
  req.body.activity,
  req.body.outcome,
  req.body.rid
    ];
  try {
  const { rows } = await db.query(createUser, values);
  // console.log(rows);
  
  return res.status(201).send(rows);
  } catch (error) {
  return res.status(400).send(error);
  }
}

dotenv.config();

module.exports = {
  createReport,
  createActivity,
};
