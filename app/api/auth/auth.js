const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('./../../config/config');

router.post('/login', function (req, res, next) {
    passport.authenticate('login', function (err, user, info) {
        if (err) return next(err);

        req.login(user, { session: false }, function (error) {
            if (error) return next(error);

            console.log(user);
            let token = signToken(user._id);
            res.json({ token: token });
        });
    })(req, res, next);
})

router.get('/profile', passport.authenticate('jwt', { session: false }), function (req, res, next) {
    console.log('profile endpoint');
    res.json(req.user);
})

let signToken = function (id) {
    return jwt.sign(
        { _id: id },
        config.secrets.jwt
    )
}

module.exports = router;