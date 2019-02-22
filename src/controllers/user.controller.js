const md5 = require('md5')
const auth = require('../services/auth.service')
const repository = require('../repositories/user.repository')
const emailService = require('../services/email.service')
const ValidationContract = require('../validators')
const ErrorValidation = require('../validators/errors')

exports.get = async (req, res, next) => {
    try {
        const itens = await repository.get()
        res.send(itens)
    } catch (err) {
        return next(err)
    }
}

exports.getById = async (req, res, next) => {
    try {
        const item = await repository.getById(req.params.id)
        return res.send(item)
    } catch (err) {
        return next(err)
    }
}

exports.refreshToken = async (req, res, next) => {
    try {
        const token = req.body.token || req.query.token || req.headers['x-access-token']
        const data = await auth.decodeToken(token)

        const user = await repository.getById(data.id)

        if (!user) {
            res.status(404).send({
                message: 'User not found'
            })
            return
        }

        const tokenData = await auth.generateToken({ id: user._id, email: user.email, nick: user.nick, roles: user.roles })

        res.status(201).send({
            token: tokenData,
            data: {
                id: user._id,
                email: user.email,
                nick: user.nick,
                avatar: user.avatar,
                roles: user.roles
            }
        })
    } catch (err) {
        return next(err)
    }
}

exports.verifyToken = async (req, res, next) => {
    try {
        const token = req.body.token || req.query.token || req.headers['x-access-token']
        await auth.verifyToken(token)
        res.send({
            valid: true,
            message: 'Token is valid'
        })
        return
    } catch (err) {
        return res.status(401).send({
            valid: false,
            message: 'Token not valid'
        })
    }
}

exports.authenticate = async (req, res, next) => {
    try {
        const user = await repository.authenticate({
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY)
        })

        if (!user) {
            res.status(401).send({
                message: 'User not found'
            })
            return
        }

        const token = await auth.generateToken({ id: user._id, email: user.email, nick: user.nick, roles: user.roles })

        res.status(201).send({
            token: token,
            data: {
                id: user._id,
                email: user.email,
                nick: user.nick,
                avatar: user.avatar,
                roles: user.roles
            }
        })
    } catch (err) {
        return next(err)
    }
}

exports.post = async (req, res, next) => {
    try {
        let contract = new ValidationContract()
        contract.isRequired(req.body.nick, 'O campo de nickname e obrigatorio.')
        contract.isRequired(req.body.password, 'O campo de senha e obrigatorio.')
        contract.isRequired(req.body.email, 'O campo de e-mail e obrigatorio.')

        if (!contract.isValid()) {
            res.status(400).send(contract.errors()).end()
            return
        }

        const existUser = await repository.getByEmail(req.body.email)
        if (!!existUser) {
            res.status(401).send({
                error: ErrorValidation.emailExist.message,
                code: ErrorValidation.emailExist.code
            }).end()
            return
        }

        const item = await repository.post(req.body)
        emailService.send(req.body.email, 'Bem vindo(a) ao GameTod', global.EMAIL_TMPL.replace('{0}', req.body.nick))

        return res.send(item)
    } catch (err) {
        return next(err)
    }
}

exports.put = async (req, res, next) => {
    try {
        const item = await repository.put(req.params.id, req.body)
        return res.send(item)
    } catch (err) {
        return next(err)
    }
}

exports.delete = async (req, res, next) => {
    try {
        await repository.delete(req.params.id)
        return res.send()
    } catch (err) {
        return next(err)
    }
}