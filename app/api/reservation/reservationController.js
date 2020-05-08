const Reservation = require('./reservation');

exports.checkReservation = function () {
    return function (req, res, next) {
        let reservationId = req.query.id;
        Reservation.findById(reservationId)
            .then(function (reservation) {
                if (!reservation) {
                    return next(Error('No reservation with that id'));
                } else {
                    req.reservation = reservation;
                    next();
                }
            })
            .catch(next)
    }
}

exports.get = function (req, res, next) {
    Reservation.find({ user: req._id })
        .populate('branch user')
        .exec()
        .then(function (reservations) {
            res.json(reservations);
        })
        .catch(next);
}

exports.post = function (req, res, next) {
    let reservation = new Reservation(req.body)
    reservation.user = req.user._id;
    reservation.save()
        .then(function (newReservation) {
            res.json(newReservation);
        })
        .catch(next)
}

exports.delete = function (req, res, next) {
    req.reservation.remove(function (err, removed) {
        if (err) {
            next(err);
        } else {
            res.json(removed);
        }
    });
}