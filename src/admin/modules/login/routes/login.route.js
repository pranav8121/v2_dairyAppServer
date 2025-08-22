'use strict';
let router = require('express').Router();
const jwt = require("jsonwebtoken");

let loginService = new (require("../service/login.service"))();
const responseHandler= require('../../../../../response-handler/response-handler');

router.post('/authenticate', responseHandler(loginService.authenticate));
module.exports = router;