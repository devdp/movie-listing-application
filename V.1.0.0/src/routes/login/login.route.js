const loginQuery = require('../../setups/query/login.query.setup');
const route = require('express').Router();
const path = require('path');

route.post('/', async (req, res) => {
    const {
        email,
        password
    } = req.body

    var result = await loginQuery(email, password);
    res.send(result)
});

route.get('/', async (req, res) => {
    res.sendFile(path.join(__dirname,'../../views/login/views.login.html'))
})

module.exports = route;