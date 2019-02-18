const repository = require('../repositories/game.repository')
const ValidationContract = require('../validators')

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
        console.log('aqui')

        let contract = new ValidationContract()
        contract.isRequired(req.body.name, 'O campo de nome e obrigatorio.')

        if(!contract.isValid()) {
            res.status(400).send(contract.errors()).end()
            return
        }

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