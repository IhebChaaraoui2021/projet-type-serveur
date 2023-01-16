//npm i express cors dotenv path body-parser jsonwebtoken bcryptjs --save
const express = require('express');
const mongoDB = require('./config/bd');
const cors = require('cors');
const path = require('path')
const bodyParser = require('body-parser');
require ('dotenv').config();

/** settings */
const app = express();
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(cors());
/*app.use(cors({
	'allowedHeaders': ['Content-Type'],
	'origin': '*',
	'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
	'preflightContinue': false
}));*/
//app.use(express.static(path.join(__dirname, './public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


mongoDB.connect()
/***routes */
app.use(require('./routes/user-route'))
app.use('/user/', function (req, res, next) {
    console.log('Request Type:', req.method);
    next();
 });

/***sever */

module.exports = app;