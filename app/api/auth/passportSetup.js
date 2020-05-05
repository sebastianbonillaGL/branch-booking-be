const config = require('./../../config/config');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy
const Oauth2Client = require('google-auth-library').OAuth2Client
const client = new Oauth2Client(config.google.clientID);


passport.use('login', new localStrategy({
    passwordField: 'idToken'
}, function (username, password, done) {
    console.log(password);
    verifyToken(password)
        .then(function (user) {
            return done(null, user);
        })
        .catch(function (error) {
            return done(error);
        });
}));

let verifyToken = function (token) {
    return new Promise(function (resolve, reject) {
        client.verifyIdToken({
            idToken: token,
            audience: config.google.clientID
        })
            .then((ticket) => {
                let payload = ticket.getPayload();
                if (payload.hd === "gorillalogic.com") {
                    return resolve({
                        name: payload.name,
                        email: payload.email
                    });
                } else {
                    return reject(Error('You are not allowed to login'));
                }
            }, (reason) => {
                return reject(reason);
            })
    });
}