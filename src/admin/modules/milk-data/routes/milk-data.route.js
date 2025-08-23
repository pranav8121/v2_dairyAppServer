'use strict';
let router = require('express').Router();
let milkDataService = new (require("../service/milk-data.service"))();
const responseHandler = require('../../../../../response-handler/response-handler');

router.get('/get_today_data', responseHandler(milkDataService.getTodayData));
module.exports = router;