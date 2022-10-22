const log = require('../logger');
const mysql = require("mysql2");
require("dotenv").config();

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
                log(data = {
                    'name': 'error',
                    'status': 304,
                    'message': `error occured while updating ${err}`,
                    'statusCode': 304
                }, 'error');
                rej("error occured");
            }
            else {
                log(data = {
                    'name': 'success',
                    'status': 201,
                    'message': 'update query successfully completed',
                    'statusCode': 201
                }, 'success');
                res("successfully updated");
            }
        });
    });
}

const RQuery = (query) => {
    return new Promise((res, rej) => {
        mysqlConn.query(query, function (err, result, fields) {
            if (err) {
                log(data = {
                    'name': 'error',
                    'status': 304,
                    'message': `error occured while reading ${err}`,
                    'statusCode': 304
                }, 'error');
                res([]);
            }
            else if (result.length > 0) {
                log(data = {
                    'name': 'success',
                    'status': 201,
                    'message': 'read query successfully completed',
                    'statusCode': 201
                }, 'success');
                res(result);
            }
            else {
                log(data = {
                    'name': 'success',
                    'status': 201,
                    'message': 'read query successfully completed',
                    'statusCode': 201
                }, 'success');
                res([]);
            }
        });
    });
}

module.exports = { readQuery, writeQuery }