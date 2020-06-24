const express = require('express');
const moment = require ('moment')
const router = express.Router();
const db = require('../dbs/index');

router.post('/', async (req, res) => {
    const createUser = `INSERT INTO
    monitorsreports(pid, mid, remark, imgurl, date, datesubmitted)
    VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
  //console.log(req.body)
  const values = [
  req.body.pid,
  req.body.mid,
  req.body.remark,
  req.body.date,
  moment(new Date())
  ];
  try {
  const { rows } = await db.query(createUser, values);
  // console.log(rows);
  
  return res.status(201).send(rows);
  } catch (error) {
  return res.status(400).send(error);
  }
  
  });
  router.get('/', async (req, res) => {
    const getAllQ = 'SELECT * FROM monitorsreports';
    try {
      // const { rows } = qr.query(getAllQ);
      const { rows } = await db.query(getAllQ);
      return res.status(201).send(rows);
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return res.status(400).send({ message: 'User with that EMAIL already exist' });
      }
      return res.status(400).send(`${error} jsh`);
    }
  });  

module.exports = router;
