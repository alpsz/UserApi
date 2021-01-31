const express = require('express');
const router = express.Router();


router.use('/company', require('./company'));

router.use('/users', require('./users'));

module.exports = router;