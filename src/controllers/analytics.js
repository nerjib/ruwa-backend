const express = require('express')
const router = express.Router();
const db = require('../dbs/index');

router.get('/', async (req, res) => {
  const getAllQ = 'SELECT count(*) FROM projects';
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

router.get('/completed', async (req, res) => {
    const getAllQ = 'SELECT count(*) FROM projects where status=$1';
    try {
      // const { rows } = qr.query(getAllQ);
      const { rows } = await db.query(getAllQ, ['completed']);
      return res.status(201).send(rows);
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return res.status(400).send({ message: 'User with that EMAIL already exist' });
      }
      return res.status(400).send(`${error} jsh`);
    }
  });

  router.get('/ongoing', async (req, res) => {
    const getAllQ = 'SELECT count(*) FROM projects where status=$1';
    try {
      // const { rows } = qr.query(getAllQ);
      const { rows } = await db.query(getAllQ, ['ongoing']);
      return res.status(201).send(rows);
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return res.status(400).send({ message: 'User with that EMAIL already exist' });
      }
      return res.status(400).send(`${error} jsh`);
    }
  });
  router.get('/abandoned', async (req, res) => {
    const getAllQ = 'SELECT count(*) FROM projects where status=$1';
    try {
      // const { rows } = qr.query(getAllQ);
      const { rows } = await db.query(getAllQ, ['abandoned']);
      return res.status(201).send(rows);
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return res.status(400).send({ message: 'User with that EMAIL already exist' });
      }
      return res.status(400).send(`${error} jsh`);
    }
  });

router.get('/reports', async (req, res) => {
    const getAllQ = 'SELECT count(*) FROM localreports';
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


module.exports =  router;