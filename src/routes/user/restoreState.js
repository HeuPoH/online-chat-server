const express = require('express');

const router = express.Router();

router.post('/restoreState', (req, res) => {
    res.json(req.user);
});

module.exports = router;