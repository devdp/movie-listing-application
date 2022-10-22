const jwt = require('jsonwebtoken')

const validateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(token == null){
        res.send({
            'type': 'authentication',
            'authentication': 'token length',
            'msg': 'Empty Token',
            'status': "BAD",
            'statusCode': 403,
            'data': null
        })
        return
    }
    jwt.verify(token, process.env.access_token_secret, (err, username) => {
        if(err){
            res.send({
                'type': 'authentication',
                'authentication': 'error in verification',
                'msg': `Issue with the token -- ${err}`,
                'status': "BAD",
                'statusCode': 403,
                'data': null
            })  
            return
        }
        req.username = username
        next()
    })
}

module.exports = validateToken