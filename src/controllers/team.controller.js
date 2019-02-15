const mongoose = require('mongoose')
const Team = mongoose.model('Game')

exports.get = async (req, res, next) => {
    try {
        const itens = await Team.find()
        res.json(itens)
    } catch (err) {
        return next(err)
    }
}

exports.getById = async (req, res, next) => {
    try {
        const item = await Team.findById(req.params.id)
        return res.json(item)
    } catch (err) {
        return next(err)
    }
}

exports.post = async (req, res, next) => {
    try {
        const item = await Team.create(req.body)
        return res.json(item)
    } catch (err) {
        return next(err)
    }
}

exports.put = async (req, res, next) => {
    try {
        const item = await Team.findByIdAndUpdate(req.params.id, req.body, { new: true })
        return res.json(item)
    } catch (err) {
        return next(err)
    }
}

exports.delete = async (req, res, next) => {
    try {
        await Team.findByIdAndRemove(req.params.id)
        return res.send()
    } catch (err) {
        return next(err)
    }
}