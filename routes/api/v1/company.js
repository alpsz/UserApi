const express = require('express');
const router = express.Router();
const passport  = require('passport');
const companyApi = require('../../../controllers/api/v1/company_api');


router.post('/add',passport.authenticate('jwt',{session: false}), companyApi.create);


module.exports = router;