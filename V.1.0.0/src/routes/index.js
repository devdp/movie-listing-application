const router = require('express').Router();
const onboard = require('./onboard/onboard.route');
const login = require('./login/login.route');
const jwt = require('./jwt/jwt.route')
const dashboard = require('./dashboard/dashboard.route');
const jwtMiddleware = require('../middleware/jwt/jwt.middleware')

router.use('/onboard', onboard);
router.use('/login', login);
router.use('/token', jwt);
router.use('/dashboard', [jwtMiddleware], dashboard);

module.exports = router;