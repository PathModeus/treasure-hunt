const config = require('../../config.json');
const axios = require('axios');
const querystring = require('querystring');

function getUri(redirectUri, state) {
    return `${config.oauth.authorizationUri}?response_type=code&client_id=${config.oauth.client_id}&redirect_uri=${redirectUri}&state=${state}`;
}

function getToken(redirectUri, code, state) {
    return axios.post(
        config.oauth.accessTokenUri,
        /*eslint-disable */
        querystring.stringify({
            'grant_type': 'authorization_code',
            'code': code,
            'client_id': config.oauth.client_id,
            'client_secret': config.oauth.client_secret,
            'redirect_uri': redirectUri,
            'state': state,
        }),
        /*eslint-enable */
    );
}

function APICall(token) {
    return axios.get(
        config.oauth.apiUrl,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
    );
}

module.exports = {
    getUri,
    getToken,
    APICall,
};
