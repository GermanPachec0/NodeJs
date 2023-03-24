const express = require('express');

let registrationController = require('../controllers/registrations');
let router  = express.Router();

router.get('/register', registrationController.new);

router.route('/users').post(registrationController.create);

module.exports = router;