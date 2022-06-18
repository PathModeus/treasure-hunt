const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const auth = require('./authMiddleware');
const api = require('./routes/api');
const test = require('./routes/test');
const health = require('./healthChecker');

const app = express();
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:3000', 'https://auth.viarezo.fr'],
    credentials: true,
}))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'ShhhhThisIsARealSecretThatNoOneShouldEverKnow',
    resave: false,
    proxy: true, // Especially if unsing nginx/apache
    saveUninitialized: true,
    cookie: { secure: false } // secure: true is recommended however it requires an https-enabled website so it can't be set in development mode
}));

app.use('/api/test', test)

app.get('/auth/login', auth.login)
app.get('/auth/logout', auth.logout);
app.get('/auth', auth.AuthCallback);
app.get('/health', health.CheckHealth);

app.use('/api', auth.validate, api);

module.exports = app;