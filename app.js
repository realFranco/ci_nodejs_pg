/**
 * Dev: f97gp1@gmail.com
 * Date: May 24th, 2020
 * 
 * Enty point for this test coding session.
 */

const express = require('express');
// const dotenv = require('dotenv');
// const dotenvExpand = require('dotenv-expand');
const Sequelize = require('sequelize');

// Importing the routes to use
const ci_user = require('./routes/ci_user');

var app = express();

const host = process.env.APP_DOMAIN;
const port = process.env.APP_PORT;

app.use('/ci-user', ci_user);

app.listen(port, () => {
    console.log('Listening at: ' + host + ':'+ port);
});

app.get('/', (req, res) => {
    return res
        .status(200)
        .send({
            result      : 'ok',
            http_code   : 200,
            msg         : 'welcome to the ci_nodejs_pg rest api',
            version     : 'v1'
        });
});

module.exports = app;