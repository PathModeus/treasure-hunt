const express = require('express');
const app = express();
app.use(express.json());


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

const bodyParser = require('body-parser');
const config = require('./config.json');
const auth = require("viarezo-auth");
const session = require('express-session');
const api = require('./routes/api');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'yourSecretIsThatYouKnowAllAboutFunkoPops',
    resave: false,
    proxy: true, // Especially if unsing nginx/apache
    saveUninitialized: true,
    cookie: { secure: true }
}));

//app.use('/', auth.OAuthMiddleware(config));
//app.get('/auth/', (req, res) => auth.AuthCallback(req, res));

app.use('/api', api)

module.exports = app;