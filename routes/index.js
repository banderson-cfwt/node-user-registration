const express = require('express');
const mongoose = require('mongoose');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const Registration = mongoose.model('Registration');

router.get('/', (req, res) => {
    res.render('form', { title: 'Registration Form' });
});

router.get('/registrations', (req, res) => {
    res.render('index', { title: 'Listing Registrations' });
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
            const registration = new Registration(req.body);
            registration.save()
                .then(() => { res.send('Thank you for your registration!'); })
                .catch(() => { res.send('Sorry! Something went wrong.'); });
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