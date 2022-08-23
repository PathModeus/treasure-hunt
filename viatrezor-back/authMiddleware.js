const randomstring = require('randomstring');
const request = require('request');
const config = require('./config.json');



// Redirect to OAuth gateway
function login(req, res) {
  if ('user' in req.session) {
    return res.redirect(`${config.WEBROOT}/login`);
  };

  if (!('state' in req.session)) {
    req.session.state = randomstring.generate();
  };
  // Redirect user to auth to authorize client to read his data
  return res.redirect('https://auth.viarezo.fr/oauth/authorize/?client_id=' + config.CLIENT_ID + "&redirect_uri=" + config.DOMAIN + "/api/auth&response_type=code&scope=default&state=" + req.session.state);
}


// OAuth gateway callback handled here
function AuthCallback(req, res) {
  // Just check wheter the state is still the same, then store the code provided
  if ('state' in req.query && req.query.state === req.session.state) {
    // User has authorized client, client has to fetch token
    request.post("https://auth.viarezo.fr/oauth/token", {
      form: {
        grant_type: 'authorization_code',
        code: req.query.code,
        redirect_uri: config.DOMAIN + "/api/auth",
        client_id: config.CLIENT_ID,
        client_secret: config.CLIENT_SECRET,
      }
    }, (err, response, body) => {
      const data = JSON.parse(body);
      // Check if the response is an error
      if ('error' in data) {
        delete req.session.state;
      }
      else {
        // First check wheter the token is still correct or not
        let now = Date.now();
        if (now / 1000 > data.expires_at) {
          return res.redirect(`${config.WEBROOT}/login`);
        }
        else {
          // Call auth API to get user data
          request.get({
            url: 'https://auth.viarezo.fr/api/user/show/me',
            headers: { 'Authorization': 'Bearer ' + data.access_token }
          }, (err, response, body) => {
            const data = JSON.parse(body);
            // Store user in session
            req.session.user = data;
            req.session.save(function () {
              return res.redirect('init');
            });
          });
        };
      };
    });
  } else {
    if ('state' in req.session) {
      delete req.session.state;
    };
    return res.redirect(`${config.WEBROOT}/login`);
  };
}


// Validate authentication from front
function validate(req, res, next) {
  // Check whether user is connected
  if (!('user' in req.session)) {
    res.status(401).end('not connected');
  } else {
    next();
  };
};


// Delete the session of the user
function logout(req, res) {
  try {
    delete req.session.user;
    delete req.session.state;
    return res.status(200).end();
  } catch (e) {
    console.log(e)
    return res.status(500).end();
  }
}


module.exports = {
  login,
  AuthCallback,
  validate,
  logout,
};
