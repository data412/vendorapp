const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

/*********************Routes Start*********************/
const apiRoute = require('./routes/main');
/*********************Routes Ends*********************/

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

/*********************Route Query Start*********************/
app.use('/', apiRoute);
/*********************Route Query Ends*********************/

module.exports = app;