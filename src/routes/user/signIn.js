const express = require('express');

const router = express.Router();
const { Passport } = require('../../extensions/passport');
const ValidateForm = require('../../settings/ValidateForm');

//Checking fields on the correctness of input.
router.post('/signIn', (req, res, next) => {
    ValidateForm.findErrors(req.body, 'signIn')
        ? res.status(400).json({ error: 'Введены не все данные' })
        : next();
});

router.post('/signIn', Passport.authenticate);

module.exports = router;