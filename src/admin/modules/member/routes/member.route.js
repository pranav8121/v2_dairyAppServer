'use strict';
let router = require('express').Router();
let memberService = new (require("../service/member.service"))();
const responseHandler= require('../../../../../response-handler/response-handler');

router.get('/get_all_member', responseHandler(memberService.getAllMembers));
module.exports = router;