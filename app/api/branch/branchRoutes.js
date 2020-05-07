const router = require('express').Router();
const controller = require('./branchController');
const passport = require('passport');

router.use(passport.authenticate('jwt', {session:false}));

router.route('/')
    .get(controller.get)
    .post(controller.post)

module.exports = router;