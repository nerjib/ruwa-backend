const express = require('express')
const http = require('http')
//const dotenv = require('dotenv');
const cors = require('cors')
const bodyParser = require('body-parser');
const path = require('path')
const app = express();
const Users = require('./src/controllers/users')
const Projects = require('./src/controllers/projects')
const Contractors = require('./src/controllers/contractors');
const LocalReports = require('./src/controllers/localreports');
app.use(cors())

http.createServer(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    if (req.method === 'OPTIONS') {
      res.headers('Access-Control-Allow-Methods', 'POST, PUT, GET, DELETE');
      return res.status(200).json({});
    }
    next();
  });
  
app.get('/', function(req,res){
res.json({
    m:'k'
})
})

app.use('/api/v1/users', Users);
app.use('/api/v1/projects', Projects);
app.use('/api/v1/contractors', Contractors);
app.use('/api/v1/localreports', LocalReports);



module.exports = app;