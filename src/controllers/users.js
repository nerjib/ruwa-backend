const express = require('express');

const router = express.Router();
const db = require('../dbs/index');

router.get('/', async (req, res) => {
  const getAllQ = 'SELECT * FROM users';
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

router.get('/:id', async (req, res) => {
  const getAllQ = 'SELECT * FROM users WHERE id= $1';
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

router.get('/signin/:email', async (req, res) => {
  const getAllQ = 'SELECT * FROM users WHERE email= $1';
  try {
    // const { rows } = qr.query(getAllQ);
    const { rows } = await db.query(getAllQ, [req.params.email]);
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
  users (last_name,first_name,other_name,phone,email,role)
  VALUES ($1, $2,$3,$4,$5,$6) RETURNING *`;

const values = [
req.body.fname,
req.body.lname,
req.body.oname ||'',
req.body.phone,
req.body.email,
req.body.role
//moment(new Date()),
];
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

});

module.exports = router;

