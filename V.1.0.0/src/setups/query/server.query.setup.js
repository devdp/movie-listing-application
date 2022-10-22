const { RQuery, checkSchema } = require('../database/mysql.setup');
const { info } = require('../logger/logging.setup')

const dbValidation = async () => {
    var Tables_in_base = await RQuery(`
        show tables from ${process.env.databaseMySQL};
    `)
    if (Tables_in_base.length >= 2) {
        info(data = {
            "funcName": "dbValidation()",
            "msg": "All required tables exists",
            "status": "OK",
            "statusCode": 201
        })
    } else {
        await checkSchema()
        info(data = {
            "funcName": "dbValidation()",
            "msg": "Some tables missing, create function initiated",
            "status": "OK",
            "statusCode": 201
        })
    }
    return;
}

module.exports = dbValidation;