const mongoose = require('mongoose')
const Game = mongoose.model('Game')

exports.get = (page) => { 
    return Game.paginate({}, {page, limit: 10}) 
    console.log('aqui')
}
exports.getById = (id) => { return Game.findById(id) }
exports.post = (data) => { return Game.create(data) }
exports.put = (id, data) => { return Game.findByIdAndUpdate(id, data, { new: true }) }
exports.delete = (id) => { Game.findByIdAndRemove(id) }