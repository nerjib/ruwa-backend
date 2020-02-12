const express = require('express');
const moment = require('moment')
const router = express.Router();
const db = require('../dbs/index');

router.get('/', async (req, res) => {
  const getAllQ = 'SELECT * FROM projects order by id desc';
  try {
    // const { rows } = qr.query(getAllQ);
    const { rows } = await db.query(getAllQ);
    return res.status(201).json(rows);
  } catch (error) {
    if (error.routine === '_bt_check_unique') {
      return res.status(400).send({ message: 'User with that EMAIL already exist' });
    }
    return res.status(400).send(`${error} jsh`);
  }
});

router.get('/:id', async(req, res) =>{
    const project = 'SELECT * FROM projects WHERE id=$1 order by id desc';
    console.log(req.params.id);
    try {
      const { rows } = await db.query(project, [req.params.id]);
     console.log(rows[0])
      if (!rows[0]) {
        return res.status(404).send({ message: 'project Not found' });
      }
          rows
      return res.status(200).json(rows);
    } catch (error) {
      return res.status(400).send(error);
    }
  });

  router.get('/localsupervisors/:id', async(req, res) =>{
    const project = 'SELECT * FROM projects WHERE local_id=$1';
    console.log(req.params.id);
    try {
      console.log('dd')
      const { rows } = await db.query(project, [req.params.id]);
     //alert(rows[0])        
     console.log('tt'+rows)     
      return res.status(200).json(rows);
    } catch (error) {
      return res.status(400).send(error);
    }
  });

router.post('/', async (req, res) => {
  const createUser = `INSERT INTO
  projects (title,state_id, local_id,location,lga,status,wardheadphone,gps,started)
  VALUES ($1, $2,$3,$4,$5,$6,$7,$8,$9) RETURNING *`;

const values = [
  req.body.title,
  req.body.state_id,
  req.body.local_id,
  req.body.location,
  req.body.lga,
  req.body.status,
  req.body.wardphone,
  req.body.gps,
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

  router.put('/:id', async (req, res) => {
    console.log('reqqqq '+req.body)

    const updateProject = `UPDATE projects
     SET status=$1, location=$2, local_id=$3, wardheadphone=$4, gps=$5, state_id=$6,
 lga=$7, contractor_id=$8, started=$9, finish=$10   WHERE id=$11 RETURNING *`;
  
  // title,state_id, local_id,location,lga,status,wardheadphone,gps,started
  const values = [
  req.body.status,
  req.body.location,
  req.body.local_id,
  req.body.wardheadphone,
  req.body.gps,
  req.body.state_id,
  req.body.lga,
  req.body.contractor_id,
  req.body.started,
  req.body.finish,
  req.params.id
  ];
  try {
  const { rows } = await db.query(updateProject, values);
  //console.log(rows);
  const data = {
    status: 'success',
    data: {
      message: 'Project updated successfully​',
    },
  };
  return res.status(201).json(data);
  } catch (error) {
  return res.status(400).send(error);
  }
  
  });
  

module.exports = router;

