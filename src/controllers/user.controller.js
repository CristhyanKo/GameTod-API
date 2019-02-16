const mongoose = require('mongoose')
const ValidationContract = require('../validators')
const md5 = require('md5')
const auth = require('../services/auth.service')
const User = mongoose.model('User')



exports.get = async (req, res, next) => {
    try {
        const itens = await User.find()
        res.send(itens)
    } catch (err) {
        return next(err)
    }
}

exports.getById = async (req, res, next) => {
    try {
        const item = await User.findById(req.params.id)
        return res.send(item)
    } catch (err) {
        return next(err)
    }
}

const authenticate = async (data) => {
    const item = await User.findOne({ email: data.email, password: data.password })
    return item
}

exports.authenticate = async (req, res, next) => {
    try {
        const user = await authenticate({
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY)
        })

        if(!user) {
            res.status(404).send({
                message: 'User not found'
            })
            return
        }

        const token = await auth.generateToken({email: user.email, nick: user.nick})

        res.status(201).send({
            token: token,
            data: {
                email: user.email,
                nick: user.nick,
                avatar: user.avatar
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
        
        const item = await User.create({
            nick: req.body.nick,
            avatar: req.body.avatar,
            password: md5(req.body.password + global.SALT_KEY),
            email: req.body.email
        })
        console.log('aqui')
        return res.send(item)
    } catch (err) {
        return next(err)
    }
}

exports.put = async (req, res, next) => {
    try {
        const item = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
        return res.send(item)
    } catch (err) {
        return next(err)
    }
}

exports.delete = async (req, res, next) => {
    try {
        await User.findByIdAndRemove(req.params.id)
        return res.send()
    } catch (err) {
        return next(err)
    }
}