const config = require('./../../config/config');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy
const Oauth2Client = require('google-auth-library').OAuth2Client
const client = new Oauth2Client(config.google.clientID);
const jwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const User = require('./user');

passport.use('login', new localStrategy({
    usernameField: 'username',
    passwordField: 'idToken'
}, function (username, password, done) {
    verifyToken(username, password)
        .then(checkUser)
        .then(function (user) {
            return done(null, user);
        })
        .catch(function (error) {
            return done(error);
        });
}));

passport.use(new jwtStrategy({
    secretOrKey: config.secrets.jwt,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}, function (token, done) {
    getFreshUser(token._id)
    .then(function(user){
        done(null, user);
    })
    .catch(function(reason){
        done(reason);
    })
}));

let verifyToken = function (username, token) {
    return new Promise(function (resolve, reject) {
        client.verifyIdToken({
            idToken: token,
            audience: config.google.clientID
        }).then((ticket) => {
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

let checkUser = function (user) {
    return new Promise(function (resolve, reject) {
        User.findOne({ email: user.email }, function (err, currentUser) {
            if (err) { return reject(err); }

            if (currentUser) {
                return resolve(currentUser);
            } else {
                new User(user).save()
                    .then(function (newUser) {
                        return resolve(newUser);
                    });
            }
        });
    });
}

let getFreshUser = function (id) {
    return new Promise(function (resolve, reject) {
        User.findById(id, function (err, currentUser) {
            if (err) { return reject(err); }

            if (!currentUser) { return reject(Error('No user found')); }

            return resolve(currentUser);
        })
    })
}

