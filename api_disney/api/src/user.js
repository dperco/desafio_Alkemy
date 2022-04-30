const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');
var engine = require('ejs-locals');
require('./db.js');

const server = express();



module.exports = server;
