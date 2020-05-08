let express = require('express');
let router = express.Router();

router.use('/branch', require('./branch/branchRoutes'));
router.use('/auth', require('./auth/auth'));
router.use('/reservation', require('./reservation/reservationRoutes'));

module.exports = router;