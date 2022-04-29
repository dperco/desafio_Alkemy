const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');
var engine = require('ejs-locals');
require('./db.js');

const server = express();

server.name = 'API';

server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

server.use('/', routes);
// create application/json parser
// var jsonParser = bodyParser.json()
 
// // create application/x-www-form-urlencoded parser
// var urlencodedParser = bodyParser.urlencoded({ extended: false })
 
// // POST /login gets urlencoded bodies
// server.post('/login', urlencodedParser, function (req, res) {
//   res.send('welcome, ' + req.body.username)
// })
 
// // POST /api/users gets JSON bodies
// server.post('/api/users', jsonParser, function (req, res) {
//   // create user in req.body
// })
// Error catching endware.

server.use(bodyParser.json()); // body en formato json
server.use(bodyParser.urlencoded({ extended: false })); //body formulario
var serv = require('http').Server(server);
const port = 3001;

   //engine & configuration
server.engine('ejs', engine);
server.set('view engine', 'ejs');


server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
