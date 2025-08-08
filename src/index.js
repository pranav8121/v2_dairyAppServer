let express = require('express');
let router = express.Router();
let adminRoutes = require('./admin/index');
let userRoutes = require('./user/index');

router.route_service_timeout = 300

router.use('/admin/', adminRoutes);
router.use('/user/', userRoutes);

module.exports = router
