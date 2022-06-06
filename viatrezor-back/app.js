const express = require('express');
const request = require("request");
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config.json');
const auth = require("viarezo-auth");
const session = require('express-session');
const api = require('./routes/api');

const app = express();
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:3000', 'https://auth.viarezo.fr'],
    credentials: true,
}))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'yourSecretIsThatYouKnowAllAboutFunkoPops',
    resave: false,
    proxy: true, // Especially if unsing nginx/apache
    saveUninitialized: true,
    cookie: { secure: false }
}));


app.get('/api/login', (req, res) => {
    if ('user' in req.session) {
        return res.redirect("http://localhost:3000/login/connected");
    };

    if (!('state' in req.session)) {
        req.session.state = "YTDVYTDUDtrdtdrdtrDVTRDYUTVTFfvyt";
    };
    // Redirect user to auth to authorize client to read his data
    return res.redirect('https://auth.viarezo.fr/oauth/authorize/?client_id='+config.client_id+"&redirect_uri="+config.domain+"/auth&response_type=code&scope=default&state="+req.session.state);
})

app.get('/auth', (req, res) => {
    // Just check wheter the state is still the same, then store the code provided
    if ('state' in req.query && req.query.state === req.session.state) {
        // User has authorized client, client has to fetch token
        request.post("https://auth.viarezo.fr/oauth/token", {form:{
            grant_type:'authorization_code',
            code: req.query.code,
            redirect_uri: config.domain+"/auth",
            client_id: config.client_id,
            client_secret: config.client_secret,
        }}, (err, response, body)=>{
            const data = JSON.parse(body);
            // Check if the response is an error
            if ('error' in data) {
                delete req.session.state;
            }
            else {
                // First check wheter the token is still correct or not
                let now = Date.now();
                if (now/1000 > data.expires_at) {
                    return res.redirect('http://localhost:3000/login');
                }
                else {
                    // Call auth API to get user data
                    request.get({
                        url: 'https://auth.viarezo.fr/api/user/show/me',
                        headers: {'Authorization':'Bearer '+data.access_token}
                    }, (err, response, body)=>{
                        const data = JSON.parse(body);
                        // Store user in session
                        req.session.user = data;
                        return res.redirect('http://localhost:3000/login/connected');
                    });
                };
            };
        });
    } else {
        if ('state' in req.session) {
            delete req.session.state;
        };
        return res.redirect('http://localhost:3000/login');
    };
});

// app.use('/api/', auth.OAuthMiddleware(config));

// const jwt = require('jsonwebtoken');
// app.get('/api/login', (req, res) => {
//     const token = jwt.sign(req.session.user, config.token_secret);
//     res.redirect(`http://localhost:3000/login/${token}`);
// });
app.get('/api/whoami', (req, res) => {
    return res.json(req.session.user);
});
app.get('/api/logout', (req, res) => {
    delete req.session.user;
});
// app.use('/api', api)

module.exports = app;