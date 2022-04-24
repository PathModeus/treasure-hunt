const bodyParser = require('body-parser');
const config = require('../config.json');
const auth = require("viarezo-auth");
const session = require('express-session');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'yourSecret',
    resave: false,
    proxy: true, // Especially if unsing nginx/apache
    saveUninitialized: true,
    cookie: { secure: true }
}));


app.use(auth.OAuthMiddleware(config));
app.get('/auth', (req, res) => auth.AuthCallback(req, res));
