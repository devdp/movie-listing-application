const router = require('express').Router();
const onboard = require('./onboard');
const login = require('./login/login.route');
const jwt = require('./jwt/jwt.route')
// const dashboard = require('./dashboard');

router.use('/onboard', onboard);
router.use('/login', login);
router.use('/token', jwt);
// router.use('/dashboard', dashboard);

module.exports = router;