const mongoose = require('mongoose')
const Game = mongoose.model('Game')

exports.get = async (req, res, next) => {
    try {
        const { page = 1 } = req.query
        const itens = await Game.paginate({}, {page, limit: 10})
        res.json(itens)
    } catch (err) {
        return next(err)
    }
}

exports.getById = async (req, res, next) => {
    try {
        const item = await Game.findById(req.params.id)
        return res.json(item)
    } catch (err) {
        return next(err)
    }
}

exports.post = async (req, res, next) => {
    try {
        const item = await Game.create(req.body)
        return res.json(item)
    } catch (err) {
        return next(err)
    }
}

exports.put = async (req, res, next) => {
    try {
        const item = await Game.findByIdAndUpdate(req.params.id, req.body, { new: true })
        return res.json(item)
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