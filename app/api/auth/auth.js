const express = require('express');
const router = express.Router();
const passport = require('passport');

router.post('/login', function (req, res, next) {
    console.log(req.body);
    passport.authenticate('login', function (err, user, info) {
        if (err) return next(err);

        req.login(user, { session: false }, function (error) {
            if (error) return next(error);

            res.json({ message: "login successful" });
        });
    })(req, res, next);
})

module.exports = router;