const express = require('express');
const passport = require('passport');

const router = express.Router();
const validateForms = require('../../settings/validateForms');

/**
 * Checking fields on the correctness of input.
 */
router.post('/signIn', (req, res, next) => {
    validateForms(req.body, 'signIn') ? res.status(400).json({ errorMessage: 'Введены не все данные' }) : next();
});

router.post('/signIn', (req, res, next) => {
    passport.authenticate('local', (err, user) => {
        if(err) return res.status(err.status).json(err);

        req.logIn(user, (err) => {
            return err ? res.status(400).json(err) : res.json(user);
        });
    })(req, res, next);
});

module.exports = router;