const express = require('express');
const moment = require ('moment')
const router = express.Router();
const db = require('../dbs/index');

router.get('/', async (req, res) => {
  const getAllQ = 'SELECT * FROM reports where complete=$1 order by id asc';
  try {
    // const { rows } = qr.query(getAllQ);
    const { rows } = await db.query(getAllQ, ['1']);
    return res.status(201).send(rows);
  } catch (error) {
    if (error.routine === '_bt_check_unique') {
      return res.status(400).send({ message: 'User with that EMAIL already exist' });
    }
    return res.status(400).send(`${error} jsh`);
  }
});

router.get('/incomplete', async (req, res) => {
  const getAllQ = 'SELECT * FROM reports order by id asc';
  try {
    // const { rows } = qr.query(getAllQ);
    const { rows } = await db.query(getAllQ, [1]);
    return res.status(201).send(rows);
  } catch (error) {
    if (error.routine === '_bt_check_unique') {
      return res.status(400).send({ message: 'User with that EMAIL already exist' });
    }
    return res.status(400).send(`${error} jsh`);
  }
});

router.get('/:id', async (req, res) => {
  const getAllQ = 'SELECT * FROM reports WHERE id= $1';
  try {
    // const { rows } = qr.query(getAllQ);
    const { rows } = await db.query(getAllQ, [req.params.id]);
    return res.status(201).send(rows);
  } catch (error) {
    if (error.routine === '_bt_check_unique') {
      return res.status(400).send({ message: 'User with that EMAIL already exist' });
    }
    return res.status(400).send(`${error} jsh`);
  }
});
router.get('/incomplete/:id', async (req, res) => {
  const getAllQ = 'SELECT * FROM reports WHERE id= $1';
  try {
    // const { rows } = qr.query(getAllQ);
    const { rows } = await db.query(getAllQ, [req.params.id]);
    return res.status(201).send(rows);
  } catch (error) {
    if (error.routine === '_bt_check_unique') {
      return res.status(400).send({ message: 'User with that EMAIL already exist' });
    }
    return res.status(400).send(`${error} jsh`);
  }
});

router.get('/activity/:id', async (req, res) => {
    const getAllQ = 'SELECT * FROM reportactivities WHERE rid= $1';
    try {
      // const { rows } = qr.query(getAllQ);
      const { rows } = await db.query(getAllQ, [req.params.id]);
      return res.status(201).send(rows);
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return res.status(400).send({ message: 'User with that EMAIL already exist' });
      }
      return res.status(400).send(`${error} jsh`);
    }
  });

//insert users
router.post('/', async (req, res) => {
  const createUser = `INSERT INTO
  reports(pid, uid, summary, summaryfrom,summaryto, conclusion, followup, compliance,date,gps)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9,$10) RETURNING *`;
console.log(req.body)
const values = [
req.body.pid,
req.body.uid,
req.body.summary,
req.body.summaryfrom,
req.body.summaryto,
req.body.conclusion,
req.body.followup,
req.body.compliance,
moment(new Date()),
req.body.gps
];
try {
const { rows } = await db.query(createUser, values);
// console.log(rows);

return res.status(201).send(rows);
} catch (error) {
return res.status(400).send(error);
}

});


//`UPDATE
//projects 
//SET status=$1, location=$2, local_id=$3, wardheadphone=$4, gps=$5, state_id=$6 WHERE id=$7 RETURNING *`;

router.put('/:id', async (req, res) => {
    const updateReport = `UPDATE
    reports SET conclusion=$1, compliance=$2, followup=$3 WHERE id=$4 and uid=$5
     RETURNING *`;
  console.log(req.body)
  const values = [
  req.body.conclusion,
  req.body.compliance,
  req.body.followup,
  req.body.rid,
  req.body.uid
  ];
  try {
  const { rows } = await db.query(updateReport, values);
  // console.log(rows);
  
  return res.status(201).send(rows);
  } catch (error) {
  return res.status(400).send(error);
  }
  
  });

  router.put('/save/:id', async (req, res) => {
      console.log('kkkk')
    const updateReport = `UPDATE
    reports SET complete=$1 WHERE id=$2 and uid=$3
     RETURNING *`;
  console.log(req.body)
  const values = [
  req.body.complete,
  req.params.id,
  req.body.uid
  ];
  try {
  const { rows } = await db.query(updateReport, values);
  // console.log(rows);
  
  return res.status(201).send(rows);
  } catch (error) {
  return res.status(400).send(error);
  }
  
  });

module.exports = router;

