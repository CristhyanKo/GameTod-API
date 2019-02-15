const mongoose = require('mongoose')
const Room = mongoose.model('Game')

exports.get = async (req, res, next) => {
    try {
        const { page = 1 } = req.query
        const itens = await Room.paginate({}, {page, limit: 10})
        res.json(itens)
    } catch (err) {
        return next(err)
    }
}

exports.getById = async (req, res, next) => {
    try {
        const item = await Room.findById(req.params.id)
        return res.json(item)
    } catch (err) {
        return next(err)
    }
}

exports.post = async (req, res, next) => {
    try {
        const item = await Room.create(req.body)
        return res.json(item)
    } catch (err) {
        return next(err)
    }
}

exports.put = async (req, res, next) => {
    try {
        const item = await Room.findByIdAndUpdate(req.params.id, req.body, { new: true })
        return res.json(item)
    } catch (err) {
        return next(err)
    }
}

exports.delete = async (req, res, next) => {
    try {
        await Room.findByIdAndRemove(req.params.id)
        return res.send()
    } catch (err) {
        return next(err)
    }
}