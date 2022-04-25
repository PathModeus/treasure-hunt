const express = require('express');
const app = express();
app.use(express.json());
//app.use('/api/', routes);


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

const api = require('./routes/api');
const auth = require('./src/oauth_impl')

app.use(oauth_impl.validate)
app.use('/api/', api)

module.exports = app;