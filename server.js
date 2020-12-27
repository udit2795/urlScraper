const express = require('express');
const cheerio = require('cheerio');
const _ = require('lodash');
const bodyParser = require('body-parser');


const routers = require('./routes/index');


const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/', routers);

const port = process.env.PORT || 5000;


app.listen(port);
