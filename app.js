const express = require('express')
const http = require('http')
const dotenv = require('dotenv');
const cors = require('cors')
const bodyParser = require('body-parser');
const path = require('path')
const app = express();
const Users = require('./src/controllers/users')
const Projects = require('./src/controllers/projects')
const Contractors = require('./src/controllers/contractors');
const LocalReports = require('./src/controllers/localreports');
const Report = require('./src/controllers/reportform')
const multer = require('multer');
const cloudinary = require('cloudinary');
const Analytics = require('./src/controllers/analytics');
app.use(cors())

http.createServer(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


dotenv.config();


app.use(express.static(path.join(__dirname, 'public')));


const storage = multer.diskStorage({
  distination: function (req, file, cb) {
    cb(null, './src');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/gif') {
    cb(null, true);
  } else {
    cb(new Error('image is not gif'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
});




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
app.use('/api/v1/analytics', Analytics);

app.post('/api/v1/reportform', upload.single('image'), (req, res) => {
  cloudinary.uploader.upload(req.file.path, function (result) {
     console.log(req.file);
    Report.createReport(req, res, result.secure_url);
  });
});



module.exports = app;