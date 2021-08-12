const express = require('express');

const router = express.Router();
const isGuest = require('../../extensions/middlewares/isGuest');
const isUser = require('../../extensions/middlewares/isUser');

router.all('/signIn', isGuest, require('./signIn'));
router.post('/signUp', isGuest, require('./signUp'));
router.get('/signOut', isUser, require('./signOut'));

module.exports = router;