let express = require('express');
let router = express.Router();
const loginRoute = require('../modules/login/routes/login.route');
const memberRoute = require('../modules/member/routes/member.route');
const milkDataRoute = require('../modules/milk-data/routes/milk-data.route');

router.use('/login', loginRoute);
router.use('/member', memberRoute);
router.use('/milk_data', milkDataRoute);

module.exports = router;