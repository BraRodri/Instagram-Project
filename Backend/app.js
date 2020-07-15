const express = require('express');
const bodyParser = require('body-parser');
const routesUser = require ('./routes/user');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/api', routesUser);

module.exports = app;