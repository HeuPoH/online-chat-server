const express = require('express');
const router = express.Router();

const isGuest = require('../../extensions/middlewares/isGuest');
const isUser = require('../../extensions/middlewares/isUser');

//If user has cookie connect.sid and this is cookie is correctly, return user data.
router.post('/restoreState', isUser, require('./restoreState'));
router.post('/signUp', isGuest, require('./signUp'));
router.post('/signIn', isGuest, require('./signIn'));
router.get('/signOut', isUser, require('./signOut'));

module.exports = router;