const express = require('express');

const router = express.Router();
const UserController = require('../../controllers/User');
const validateForms = require('../../settings/validateForms');

/**
 * Checking fields on the correctness of input.
 */
router.use((req, res, next) => {
    validateForms(req.body, 'signUp') ? res.status(400).json({ errorMessage: 'Введены не все данные или пароли не одинаковые' }) : next();
});

/**
 * Delete fields, which dont put to database
 */
router.use((req, res, next) => {
    delete req.body.repeatPassword;
    next();
});

router.post('/signUp', UserController.signUp);

module.exports = router;