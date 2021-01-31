const express = require('express');
const router = express.Router();
const usersApi = require('../../../controllers/api/v1/users_api');
const passport  = require('passport');

router.post('/add', usersApi.create);

router.get('/profile/:id',passport.authenticate('jwt',{session: false}), usersApi.profile);

router.post('/edit/:id', passport.authenticate('jwt',{session: false}), usersApi.update);

router.get('/destroy/:id',passport.authenticate('jwt',{session: false}), usersApi.destroy);

router.post('/create-session', usersApi.createSession);

module.exports = router;