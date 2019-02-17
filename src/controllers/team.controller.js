const repository = require('../repositories/team.repository')

exports.get = async (req, res, next) => {
    try {
        const { page = 1 } = req.query
        const itens = await repository.get(page)
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

exports.post = async (req, res, next) => {
    try {
        const item = await repository.post(req.body)
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