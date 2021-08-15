const express = require('express');

const router = express.Router();
const UserController = require('../../controllers/User');
const ValidateForm = require('../../settings/ValidateForm');

// Checking fields on the correctness of input.
router.use((req, res, next) => {
    ValidateForm.findErrors(req.body, 'signUp') ? res.status(400).json({ errorMessage: 'Введены не все данные или пароли не одинаковые' }) : next();
});

// Delete fields, which dont put to database
router.use((req, res, next) => {
    delete req.body.repeatPassword;
    next();
});

router.post('/signUp', UserController.signUp);

module.exports = router;