const mongoose = require('mongoose')
const Invite = mongoose.model('Game')

exports.get = async (req, res, next) => {
    try {
        const itens = await Invite.find()
        res.json(itens)
    } catch (err) {
        return next(err)
    }
}

exports.getById = async (req, res, next) => {
    try {
        const item = await Invite.findById(req.params.id)
        return res.json(item)
    } catch (err) {
        return next(err)
    }
}

exports.post = async (req, res, next) => {
    try {
        const item = await Invite.create(req.body)
        return res.json(item)
    } catch (err) {
        return next(err)
    }
}

exports.put = async (req, res, next) => {
    try {
        const item = await Invite.findByIdAndUpdate(req.params.id, req.body, { new: true })
        return res.json(item)
    } catch (err) {
        return next(err)
    }
}

exports.delete = async (req, res, next) => {
    try {
        await Invite.findByIdAndRemove(req.params.id)
        return res.send()
    } catch (err) {
        return next(err)
    }
}