const jwt = require('jsonwebtoken')
const config = require('../config')

exports.generateToken = async (data) => {
    return await jwt.sign(data, global.SALT_KEY, { expiresIn: '1d' })
}

exports.decodeToken = async (token) => {
    let data = await jwt.verify(token, global.SALT_KEY)
    return data
}

exports.authorize = (req, res, next) => {
    var token = req.body.token || req.query.token || req.headers['x-access-token']

    if (!token) {
        res.status(401).json({
            message: 'Restricted access'
        })
    } else {
        jwt.verify(token, global.SALT_KEY, (error, decoded) => {
            if (error) {
                res.status(401).json({
                    message: 'Invalid Token'
                })
            } else {
                next()
            }
        })
    }
}

exports.isAdmin = (req, res, next) => {
    
    var token = req.body.token || req.query.token || req.headers['x-access-token']
    
    if (!token) {
        res.status(401).json({
            message: 'Restricted access'
        })
    } else {
        jwt.verify(token, global.SALT_KEY, (error, decoded) => {
            if (error) {
                res.status(401).json({
                    message: 'Invalid Token'
                })
            } else {
                console.log(decoded)
                if (decoded.roles.includes(config.ADMIN)) {
                    next()
                } else {
                    res.status(403).json({
                        message: 'Functionality only valid for administrators'
                    })
                }
            }
        })
    }
}