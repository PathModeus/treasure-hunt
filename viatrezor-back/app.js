const express = require('express');
const app = express();
app.use(express.json());
const cors = require('cors')

app.use(cors())

const bodyParser = require('body-parser');
const config = require('./config.json');
const session = require('express-session');
const api = require('./routes/api');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'ShhhhThisIsARealSecretThatNoOneShouldEverKnow',
    resave: false,
    proxy: true, // Especially if unsing nginx/apache
    saveUninitialized: true,
    cookie: { secure: true }
}));

//app.use('/', auth.OAuthMiddleware(config));
//app.get('/auth/', (req, res) => auth.AuthCallback(req, res));


app.use('/api', api)

module.exports = app;