let express = require('express');
let router = express.Router();
const loginRoute = require('../modules/login/routes/login.route');

router.use('/login', loginRoute);

module.exports = router;