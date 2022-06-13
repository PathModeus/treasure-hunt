const express = require('express');
const app = express();
app.use(express.json());
const cors = require('cors')

app.use(cors())

const bodyParser = require('body-parser');
const session = require('express-session');
const api = require('./routes/api');
const test = require('./routes/test');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'ShhhhThisIsARealSecretThatNoOneShouldEverKnow',
    resave: false,
    proxy: true, // Especially if unsing nginx/apache
    saveUninitialized: true,
    cookie: { secure: true }
}));

app.use('/api', api)
app.use('/api/test', test)

module.exports = app;