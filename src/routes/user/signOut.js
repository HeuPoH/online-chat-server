const express = require('express');

const UserController = require('../../controllers/User');
const router = express.Router();

router.get('/signOut', UserController.signOut);

module.exports = router;