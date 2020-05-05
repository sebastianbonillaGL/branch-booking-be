const router = require('express').Router();
const controller = require('./branchController');

router.route('/')
    .get(controller.get)
    .post(controller.post)

module.exports = router;