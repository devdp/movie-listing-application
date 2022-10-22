const { encryptPassword } = require('../../utilities/password.utility');
const { RQuery, WQuery } = require('../database/mysql.setup');
const { info, error } = require('../logger/logging.setup');

const signUpQuery = async (email, fullname, password) => {
    const [{ user }] = await RQuery(`
        SELECT
            COUNT(id) as user
        FROM
            users
        WHERE
            email = '${email}';
    `)
    if (user > 0) {
        info(data = {
            'msg': 'User already exists',
            'funcName': 'signUpQuery(email, fullname, password)',
            'status': "OK",
            'statusCode': 200
        })
        return (data = {
            'msg': 'User Already Exists',
            'funcName': 'signUpQuery(email, fullname, password)',
            'status': "OK",
            'statusCode': 200
        })
    } else {
        const response = await WQuery(`
            INSERT INTO
                users
            (
                email,
                username,
                password
            ) values (
                '${email}',
                '${fullname}',
                '${await encryptPassword(password)}'
            );
        `);
        info(data = {
            'msg': 'User created successfully',
            'funcName': 'signUpQuery(email, fullname, password)',
            'status': "OK",
            'statusCode': 200
        })
        return (data = {
            'msg': 'User Created Successfully',
            'funcName': 'signUpQuery(email, fullname, password)',
            'status': "OK",
            'statusCode': 200
        })
    }
}

module.exports = signUpQuery;