'use strict';
let router = require('express').Router();
let loginService = new (require("../service/member.service"))();
const responseHandler= require('../../../../../response-handler/response-handler');

router.post('/authenticate', responseHandler(loginService.authenticate));

module.exports = router;