const logger = require('../../model/loggingModel.model')()

const info = (data) => {
    logger.info(data)
    return;
}

const error = (data) => {
    logger.error(data)
    return;
}

module.exports = {
    info,
    error
}