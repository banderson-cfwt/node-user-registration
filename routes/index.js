const express = require('express');
const { body, validationResult } = require('express-validator');

const router = express.Router();

router.get('/', (req, res) => {
    res.render('form', { title: 'Registration Form' });
});

router.post('/', 
    [
        body('name')
            .isLength({ min: 3 })
            .trim()
            .escape()
            .withMessage('Please enter a name.'),
        body('email')
            .isLength({ min: 3 })
            .isEmail()
            .normalizeEmail()
            .withMessage('Please enter an email address.'),
    ],(req, res) => {
        const errors = validationResult(req);

        if (errors.isEmpty()) {
            res.send('Thank you for your registration!');
        } else {
            res.render('form', { 
                title: 'Registration Form',
                errors: errors.array(),
                data: req.body,
            });
        }
    }
);

module.exports = router;