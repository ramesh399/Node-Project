const express = require('express');
var router = express.Router();



router.use('/user',require('./user'));
//router.use('/admin',require('./admin'));


module.exports = router;