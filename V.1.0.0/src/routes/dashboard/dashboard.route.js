const { create, get, update, del } = require('../../setups/query/dashboard.query.setup');
const route = require('express').Router();

route.post('/create/:id', async (req, res) => {
    var response = await create(req)
    res.send(response)
});

route.get('/list/:id', async (req, res) => {
    var response = await get(req)
    res.send(response)
});

route.put('/update/:id', async (req, res) => {
    var response = await update(req)
    res.send(response)
});

route.delete('/del/:movieId', async (req, res) => {
    var response = await del(req)
    res.send(response)
});

module.exports = route;