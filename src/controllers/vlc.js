const express = require('express');
const moment = require ('moment')
const router = express.Router();
const db = require('../dbs/index');

const updateprojectfunc = async(e,pid)=>{
    const getAllQ = `update projects set functiionality=$1 where id=#2`
    try {
      // const { rows } = qr.query(getAllQ);
      const { rows } = await db.query(getAllQ,[e,pid]);
     
      return rows;
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return ({ message: 'User with that EMAIL already exist' });
      }
      return (`${error} jsh`);
  
    }
  
  }
  
    router.post('/', async (req, res) => {
      await updateprojectfunc(req.body.functionality,req.body.pid)
  
      const createUser = `INSERT INTO
      followupreports(pid, sid, functionality,remark,cause,imgurl1,imgurl2,cordinate,gentime,time)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9,$10) RETURNING *`;
    console.log(req.body)
    const values = [
    req.body.pid,
    req.body.mid,
    req.body.functionality,
    req.body.remark,
    req.body.cause,
    req.body.imgurl1,
    req.body.imgurl2,
    req.body.cordinate,
    req.body.gentime,
    moment(new Date()),
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
    const getAllQ = `SELECT * FROM followupreports left join projects on projects.id = followupreports.pid
     where followupreports.functionality='no' and projects.functionality='no'`;
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