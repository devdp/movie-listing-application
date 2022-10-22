const { create, get, update, del } = require('../../setups/query/dashboard.query.setup');

const route = require('express').Router();

route.post('/create/:id', (req, res) => {
    create()
});

route.get('/list/:id', async (req, res) => {
    get()
});

route.put('/update/:id', async (req, res) => {
    update()
});

route.delete('/del/:id', async (req, res) => {
    del()
});

module.exports = route;