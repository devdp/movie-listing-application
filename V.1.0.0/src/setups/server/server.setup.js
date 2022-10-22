const express = require('express');
const cors = require('cors');
const { error, info } = require('../logger/logging.setup');
const routes = require('../../routes');
const dbValidation = require('../query/server.query.setup');

const setup = (uuid) => {
    
    info(data = {
        'funcName': "setup(uuid)",
        'msg': 'Server started with uuid mapping',
        'currentUUID': uuid,
        'status': 'OK',
        'statusCode': 100
    });

    const app = express();

    app.use(cors());

    app.use(express.urlencoded({ extended: true, limit: '50mb' }));
    app.use(express.json({ limit: '50mb' }));

    dbValidation();

    app.use('/routes/v1', routes);

    app.use(function (req, res) {
        error(data = {
            'msg': 'Invalid Route Request',
            'route': `${req.path}`,
            'status': "BAD",
            'statusCode': 404
        });

        res.send(data = {
            'msg': 'Invalid Route Request',
            'route': `${req.path}`,
            'status': "BAD",
            'statusCode': 404
        });
    });

    return app
};

module.exports = setup;