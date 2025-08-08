let express = require('express');
let router = express.Router();
let adminRoutes = require('./admin/routes/admin');
let userRoutes = require('./user/routes/user');

router.route_service_timeout = 300

router.use('/admin/', adminRoutes);
router.use('/user/', userRoutes);

module.exports = router
