const {info, error} = require('../logger/logging.setup');
const mysql = require("mysql2");
const models = require('../../model/mysqlModel.model');

const mysqlConn = mysql.createPool({
    host: process.env.hostMySQL,
    user: process.env.userMySQL,
    database: process.env.databaseMySQL,
    password: process.env.passwordMySQL,
    port: process.env.portMySQL,
    waitForConnections: true,
    connectionLimit: 2000,
    queueLimit: 0,
    multipleStatements: true
}, { debug: true });

const WQuery = (query) => {
    return new Promise((res, rej) => {
        mysqlConn.query(query, function (err, result, fields) {
            if (err) {
                error(data = {
                    'name': 'error',
                    'status': 304,
                    'message': `error occured while updating ${err}`,
                    'statusCode': 304
                });
                rej("error occured");
            }
            else {
                info(data = {
                    'name': 'success',
                    'status': 201,
                    'message': 'update query successfully completed',
                    'statusCode': 201
                });
                res("successfully updated");
            }
        });
    });
}

const RQuery = (query) => {
    return new Promise((res, rej) => {
        mysqlConn.query(query, function (err, result, fields) {
            if (err) {
                error(data = {
                    'name': 'error',
                    'status': 304,
                    'message': `error occured while reading ${err}`,
                    'statusCode': 304
                });
                res([]);
            }
            else if (result.length > 0) {
                info(data = {
                    'name': 'success',
                    'status': 201,
                    'message': 'read query successfully completed',
                    'statusCode': 201
                });
                res(result);
            }
            else {
                info(data = {
                    'name': 'success',
                    'status': 201,
                    'message': 'read query successfully completed',
                    'statusCode': 201
                });
                res([]);
            }
        });
    });
}

const checkSchema = () => {
    WQuery(models.onboard);
}

module.exports = { RQuery, WQuery, checkSchema }