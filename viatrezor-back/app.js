const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const auth = require('./authMiddleware');
const api = require('./routes/api');
const health = require('./healthChecker');
const test = require('./routes/test');
const config = require('./config.json');

const app = express();
app.use(express.json());
app.use(cors({
    origin: [config.WEBROOT, 'https://auth.viarezo.fr'],
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



app.get('/api/auth/login', auth.login)
app.get('/api/auth/logout', auth.logout);
app.get('/api/auth', auth.AuthCallback);
app.get('/api/health', health);

app.use('/api', auth.validate, api);

app.use('/test', auth.validate, test)

module.exports = app;
