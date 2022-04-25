const oauth = require('./oauth.controller');
const config = require('../../config.json');
const models = require('../models/relations');
const jwt = require('jsonwebtoken');

const redirectUri = `${config.backUrl}/auth/callback`;
const defaultPhoto = 'https://auth.viarezo.fr/static/images/default_user_photo.jpeg';

// Redirect to OAuth gateway

function login(req, res) {
    req.session.alteredPath = req.params.alteredPath;
    req.session.state = Math.random().toString(36);
    res.redirect(oauth.getUri(redirectUri, req.session.state));
}


// OAuth gateway callback handled here

async function callback(req, res, next) {
    try {
        const response = await oauth.getToken(redirectUri, req.query.code, req.session.state);
        const accessToken = response.data.access_token;
        // const refreshToken = response.data.refresh_token;
        const apiRes = await oauth.APICall(accessToken);
        const info = apiRes.data;
        // Find user in db or create new data

        const [user] = await models.user.findOrCreate({
            where: {
                login: info.login,
            },
            defaults: {
                fullName: `${info.firstName} ${info.lastName}`,
                photoPath: info.photo ? `https://auth.viarezo.fr/media/${info.photo}` : defaultPhoto,
            },
        });
        // Generate a API token and send it to front
        user.update({
            fullName: `${info.firstName} ${info.lastName}`,
            photoPath: info.photo ? `https://auth.viarezo.fr/media/${info.photo}` : defaultPhoto,
        });
        const token = jwt.sign({
            login: user.dataValues.login,
            fullName: user.dataValues.fullName,
        }, config.token_secret);
        res.redirect(`${config.frontUrl}/login/${token}/${req.session.alteredPath}`);
    } catch (e) {
        next(e);
    }
}
// Validate tokens from front

function validate(req, res, next) {
    // Check whether token was sent

    if (!req.headers.token) {
        res.end('token required');
    }
    try {
        // Decode token and continue if succeeded

        const decoded = jwt.verify(req.headers.token, config.token_secret);
        req.user = decoded;
        next();
    } catch (err) {
        res.end('wrong token !');
    }
}

function authenticate(token) {
    try {
        // Decode token and continue if succeeded

        const decoded = jwt.verify(token, config.token_secret);
        return decoded;
    } catch (err) {
        console.error(err);
        return null;
    }
}

// Export functions

module.exports = {
    login,
    callback,
    validate,
    authenticate,
};
