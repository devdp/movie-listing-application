const { generateAccessToken, generateRefreshToken } = require('../../utilities/jwt.utility');
const { decryptPassword } = require('../../utilities/password.utility');
const { RQuery, WQuery } = require('../database/mysql.setup');
const {error,info} = require('../logger/logging.setup')

const loginQuery = async (email, password) => {
    const userData = await RQuery(`
        SELECT
            *
        FROM
            users
        WHERE
            email = '${email}';
    `);
    if (userData.length == 0) {
        info(data = {
            'msg': 'User doesnot exists',
            'status': "OK",
            'statusCode': 200
        });
        return ({
            'msg': 'User Does Not Exists',
            'status': "OK",
            'statusCode': 200
        })
    } else {
        if (await decryptPassword(password, userData[0].password)) {
            info(data = {
                'msg': 'User logged in successfully',
                'status': "OK",
                'statusCode': 200
            });
            return ({
                'msg': 'User Logged In Successfully',
                'status': "OK",
                'statusCode': 200,
                'data': {
                    'fullname': userData[0].username,
                    'email': userData[0].email
                },
                'token': {
                    'accessToken': generateAccessToken(userData[0].email),
                    'refreshToken': generateRefreshToken(userData[0].email)
                }
            })
        } else {
            error(data = {
                'msg': 'Invalid Credentials',
                'status': "BAD",
                'statusCode': 500
            });
            return ({
                'msg': 'Invalid Credentials',
                'status': "BAD",
                'statusCode': 500
            })
        }
    }
}

module.exports = loginQuery