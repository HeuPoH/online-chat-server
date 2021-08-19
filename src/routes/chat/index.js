const express = require('express');

const router = express.Router();
const isUser = require('../../extensions/middlewares/isUser');
const ChatController = require('../../controllers/Chat');

// Access only for users.
router.use('/', isUser);
router.get('/', ChatController.getMessages);
router.ws('/', require('./wsChat'));

module.exports = router;