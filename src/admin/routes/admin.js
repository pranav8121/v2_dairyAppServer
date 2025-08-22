let express = require('express');
let router = express.Router();
const loginRoute = require('../modules/login/routes/login.route');
const memberRoute = require('../modules/member/routes/member.route');

router.use('/login', loginRoute);
router.use('/member', memberRoute);

module.exports = router;