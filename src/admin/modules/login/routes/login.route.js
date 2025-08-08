'use strict';
let router = require('express').Router();
let LoginController = require('../controller/login.controller');
let loginController = new LoginController();

// Login route - the path is '/' because admin/index.js already routes to '/login'
router.post('/', loginController.login.bind(loginController));

module.exports = router;