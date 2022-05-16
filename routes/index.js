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
            .withMessage('Please enter a name.'),
        body('email')
            .isLength({ min: 3 })
            .withMessage('Please enter an email.'),
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