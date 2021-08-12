const express = require('express');

const router = express.Router();
const isUser = require('../../extensions/middlewares/isUser');

router.get('/chat', (req, res) => {
    res.send('chat');
});