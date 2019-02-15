const mongoose = require('mongoose')
const User = mongoose.model('Game')

exports.get = async (req, res, next) => {
    try {
        const itens = await User.find()
        res.json(itens)
    } catch (err) {
        return next(err)
    }
}

exports.getById = async (req, res, next) => {
    try {
        const item = await User.findById(req.params.id)
        return res.json(item)
    } catch (err) {
        return next(err)
    }
}

exports.post = async (req, res, next) => {
    try {
        const item = await User.create(req.body)
        return res.json(item)
    } catch (err) {
        return next(err)
    }
}

exports.put = async (req, res, next) => {
    try {
        const item = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
        return res.json(item)
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