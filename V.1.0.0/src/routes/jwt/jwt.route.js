const router = require('express').Router()
const jwt = require('jsonwebtoken');
const { getData } = require('../../utilities/cache.utility');
const { generateAccessToken } = require('../../utilities/jwt.utility');

router.post('/', async (req, res) => {
    const refreshToken = req.body.token
    if(refreshToken == null){
        res.send({
            'type': 'validation',
            'validation': 'token length',
            'msg': 'Empty Token',
            'status': "BAD",
            'statusCode': 401,
            'data': null
        })
        return
    }
    if(await getData(`${req.body.email}_refresh`) != refreshToken){
        res.send({
            'type': 'validation',
            'validation': 'refresh token validity',
            'msg': 'Invalid Token',
            'status': "BAD",
            'statusCode': 403,
            'data': null
        })
        return
    }
    jwt.verify(refreshToken, process.env.refresh_token_secret, (err, username) => {
        if(err){
            res.send({
                'type': 'authentication',
                'authentication': 'error in verification',
                'msg': `Issue With The Token -- ${err}`,
                'status': "BAD",
                'statusCode': 403,
                'data': null
            })
            return
        }
        const accessToken = generateAccessToken({name: username.name})
        res.send({
            'type': 'authentication',
            'authentication': 'token regeneration',
            'msg': 'token regrenerated successfully',
            'status': "OK",
            'statusCode': 200,
            'data': {
                'accessToken': accessToken
            }
        })
        return
    })
})

module.exports = router;