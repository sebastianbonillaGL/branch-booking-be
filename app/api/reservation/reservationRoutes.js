const express = require('express');
const router = express.Router();
const passport = require('passport');
const controller = require('./reservationController');

router.use(passport.authenticate('jwt', { session: false }));

router.route('/')
    .get(controller.get)
    .post(controller.checkReservationByDate(), controller.post)
    .delete(controller.checkReservation(), controller.delete)

module.exports = router;