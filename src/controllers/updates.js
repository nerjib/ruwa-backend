const express = require('express');
const moment = require ('moment')
const router = express.Router();
//const Helper = require('../../controllers/auth/helper');
//const jwt = require('jsonwebtoken');
const db = require('../dbs/index');





const getHpbhPid = async()=>{
  const getAllQ = `insert into hpbhcov(pid) select id from projects where title=$1 and id not in (select pid from hpbhcov)`
  try {
    // const { rows } = qr.query(getAllQ);
    const { rows } = await db.query(getAllQ,['Community Borehole']);
   
    return rows;
  } catch (error) {
    if (error.routine === '_bt_check_unique') {
      return ({ message: 'User with that EMAIL already exist' });
    }
    return (`${error} jsh`);

  }

}

const getHpbhTos = async()=>{
  const getAllQ = `update hpbhcov set tos=10 from reports where hpbhcov.pid=reports.pid and hpbhcov.pid in (select pid from reports where pstatus=$1)`
  try {
    // const { rows } = qr.query(getAllQ);
    const { rows } = await db.query(getAllQ,['TOS']);
   
    return rows;
  } catch (error) {
    if (error.routine === '_bt_check_unique') {
      return ({ message: 'User with that EMAIL already exist' });
    }
    return (`${error} jsh`);

  }

}

const getHpbhGs = async()=>{
  const getAllQ = `update hpbhcov set gs=15 from reports where hpbhcov.pid=reports.pid and hpbhcov.pid in (select pid from reports where pstatus=$1)`
  try {
    // const { rows } = qr.query(getAllQ);
    const { rows } = await db.query(getAllQ,['GS']);
   
    return rows;
  } catch (error) {
    if (error.routine === '_bt_check_unique') {
      return ({ message: 'User with that EMAIL already exist' });
    }
    return (`${error} jsh`);

  }

}

const getHpbhDrilling = async()=>{
  const getAllQ = `update hpbhcov set drilling=25 from reports where hpbhcov.pid=reports.pid and hpbhcov.pid in (select pid from reports where pstatus=$1)`
  try {
    // const { rows } = qr.query(getAllQ);
    const { rows } = await db.query(getAllQ,['Drilling']);
   
    return rows;
  } catch (error) {
    if (error.routine === '_bt_check_unique') {
      return ({ message: 'User with that EMAIL already exist' });
    }
    return (`${error} jsh`);

  }

}

  const getHpbhPt= async()=>{
    const getAllQ = `update solrcov set drilling=25,pt=5 from reports where hpbhcov.pid=reports.pid and hpbhcov.pid in (select pid from reports where pstatus=$1)`
    try {
      // const { rows } = qr.query(getAllQ);
      const { rows } = await db.query(getAllQ,['PT']);
     
      return rows;
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return ({ message: 'User with that EMAIL already exist' });
      }
      return (`${error} jsh`);
  
    }

    
  }

  const getHpbhPi = async()=>{
    const getAllQ = `update hpbhcov set drilling=25,pt=5,pi=20 from reports where hpbhcov.pid=reports.pid and hpbhcov.pid in (select pid from reports where pstatus=$1)`
    try {
      // const { rows } = qr.query(getAllQ);
      const { rows } = await db.query(getAllQ,['PI']);
     
      return rows;
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return ({ message: 'User with that EMAIL already exist' });
      }
      return (`${error} jsh`);
  
    }
  
  }
  

  const getHpbhPlatforming = async()=>{
    const getAllQ = `update hpbhcov set drilling=25,platforming=15,pt=5 from reports where hpbhcov.pid=reports.pid and hpbhcov.pid in (select pid from reports where pstatus=$1)`
    try {
      // const { rows } = qr.query(getAllQ);
      const { rows } = await db.query(getAllQ,['Platforming']);
     
      return rows;
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return ({ message: 'User with that EMAIL already exist' });
      }
      return (`${error} jsh`);
  
    }
  
  }

  const getHpbhPlatforming2 = async()=>{
    const getAllQ = `update hpbhcov set drilling,platforming=15,pi=20,pt=5 from reports where hpbhcov.pid=reports.pid and hpbhcov.pid in (select pid from reports where pstatus=$1)`
    try {
      // const { rows } = qr.query(getAllQ);
      const { rows } = await db.query(getAllQ,['Platforming2']);
     
      return rows;
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return ({ message: 'User with that EMAIL already exist' });
      }
      return (`${error} jsh`);
  
    }
  
  }

  const getHpbhCr = async()=>{
    const getAllQ = `update hpbhcov set cr=5 from reports where hpbhcov.pid=reports.pid and hpbhcov.pid in (select pid from reports where pstatus=$1)`
    try {
      // const { rows } = qr.query(getAllQ);
      const { rows } = await db.query(getAllQ,['CR']);
     
      return rows;
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return ({ message: 'User with that EMAIL already exist' });
      }
      return (`${error} jsh`);
  
    }
  
  }

  
  const sumHpbh = async()=>{
    const getAllQ = `update hpbhcov set total=(gs+tos+drilling+pt+pi+platforming+cr+fr), total2=(gs+tos+drilling+pt+pi+platforming+cr+fr)`
    try {
      // const { rows } = qr.query(getAllQ);
      const { rows } = await db.query(getAllQ);
     
      return rows;
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return ({ message: 'User with that EMAIL already exist' });
      }
      return (`${error} jsh`);
  
    }
  
  }



  const getHpbhFr = async()=>{
    const getAllQ = `update hpbhcov set fr=5,total2=100 from reports where hpbhcov.pid=reports.pid and hpbhcov.pid in (select pid from reports where pstatus=$1)`
    try {
      // const { rows } = qr.query(getAllQ);
      const { rows } = await db.query(getAllQ,['FR']);
     
      return rows;
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return ({ message: 'User with that EMAIL already exist' });
      }
      return (`${error} jsh`);
  
    }  
  }


const sumHpbhstages=async()=>{
  const getAllQ = `update solrcov set total=(gs+tos+drilling+pt+pi+platforming+cr+fr) where pid is not null`
  try {
    // const { rows } = qr.query(getAllQ);
    const { rows } = await db.query(getAllQ);
   
    return rows;
  } catch (error) {
    if (error.routine === '_bt_check_unique') {
      return ({ message: 'User with that EMAIL already exist' });
    }
    return (`${error} jsh`);

  }

}








router.get('/hpbh', async (req, res) => {
    
  let kk= await getHpbhPid() 
    let kk1= await getHpbhTos() 
    let kk2= await getHpbhGs() 
    let kk3= await getHpbhDrilling() 
    let kk4= await getHpbhPt() 
    let kk5= await getHpbhPi() 
    let kk6= await getHpbhPlatforming()
    let kk10= await getHpbhPlatforming2()
    let kk7= await getHpbhCr()
    let kk9 = await sumHpbh()
    let kk8= await getHpbhFr()
   res.status(201).json(kk8)
})

module.exports = router;
