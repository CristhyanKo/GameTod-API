const mongoose = require('mongoose')
const Game = mongoose.model('Game')
const ValidationContract = require('../validators')

exports.get = async (req, res, next) => {
    try {
        const { page = 1 } = req.query
        const itens = await Game.paginate({}, {page, limit: 10})
        res.send(itens)
    } catch (err) {
        return next(err)
    }
}

exports.getById = async (req, res, next) => {
    try {
        const item = await Game.findById(req.params.id)
        return res.send(item)
    } catch (err) {
        return next(err)
    }
}

exports.post = async (req, res, next) => {
    try {
        let contract = new ValidationContract()
        contract.isRequired(req.body.name, 'O campo de nome e obrigatorio.')

        if(!contract.isValid()) {
            res.status(400).send(contract.errors()).end()
            return
        }

        const item = await Game.create(req.body)
        return res.send(item)
    } catch (err) {
        return next(err)
    }
}

exports.put = async (req, res, next) => {
    try {
        const item = await Game.findByIdAndUpdate(req.params.id, req.body, { new: true })
        return res.send(item)
    } catch (err) {
        return next(err)
    }
}

exports.delete = async (req, res, next) => {
    try {
        await Game.findByIdAndRemove(req.params.id)
        return res.send()
    } catch (err) {
        return next(err)
    }
}