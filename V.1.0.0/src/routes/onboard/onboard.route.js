const route = require('express').Router();
const path = require('path');
const signUpQuery = require('../../setups/query/signUp.query.setup');
const { error, info } = require('../../setups/logger/logging.setup')

route.post('/', async (req, res) => {
    const {
        email,
        fullname,
        password
    } = req.body;

    if (email == undefined || fullname == undefined || password == undefined) {
        error(data = {
            'msg': 'Some parameters missing',
            'route': `${req.path}`,
            'status': "BAD",
            'statusCode': 204
        })
        res.send(data = {
            'msg': 'Some parameters missing',
            'route': `${req.path}`,
            'status': "BAD",
            'statusCode': 204
        })
        return;
    }
    else {
        var result = await signUpQuery(email, fullname, password);
        res.send(result)
        return
    }
})

route.get('/', async (req, res) => {
    res.sendFile(path.join(__dirname,'../../views/signUp/views.signUp.html'))
})

module.exports = route;