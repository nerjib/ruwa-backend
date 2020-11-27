const express = require('express');
const moment = require ('moment')
const router = express.Router();
const db = require('../dbs/index');

router.post('/', async (req, res) => {
    const createUser = `INSERT INTO
    changeoflocation(pid, sid, newcommunity, newward, reason,changestatus, gentime)
    VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
  //console.log(req.body)
  const values = [
  req.body.pid,
  req.body.mid,
  req.body.newcommunity,
  req.body.ward,
  req.body.reason,
  'Pending',
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
    const getAllQ = 'SELECT * FROM changeoflocation left join projects on projects.id = changeoflocation.pid';
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

  router.put('/requestrespond/', async (req, res) => {
    const createUser = `UPDATE changeoflocation set changestatus=$1  where id=$2 RETURNING *`;
  
  const values = [
  req.body.status,
  req.body.pid];
  try {
  const { rows } = await db.query(createUser, values);
  // console.log(rows);
  const data = {
    status: 'success',
    data: {
      message: 'User added successfully​',
      Name: rows[0].first_name,
      Email: rows[0].email,
      phone: rows[0].phone,
    },
  };
  return res.status(201).send(data);
  } catch (error) {
  return res.status(400).send(error);
  }
})

router.put('/approvedrequest', async (req, res) => {
    const createUser = `UPDATE projects set community=$1, ward=$2  where id=$3 RETURNING *`;
  
  const values = [
  req.body.community,
  req.body.ward,
    req.body.pid];
  try {
  const { rows } = await db.query(createUser, values);
  // console.log(rows);
  const data = {
    status: 'success',
    data: {
      message: 'project updated​',
      
    },
  };
  return res.status(201).send(data);
  } catch (error) {
  return res.status(400).send(error);
  }
})
module.exports = router;
