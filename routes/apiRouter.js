let express = require('express');
let router = express.Router();
let branches = require('../controller/branchController');

branches(router);

module.exports = router;