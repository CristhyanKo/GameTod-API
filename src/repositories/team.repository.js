const mongoose = require('mongoose')
const Team = mongoose.model('Team')

exports.get = (page) => { return Team.paginate({}, {page, limit: 10}) }
exports.getById = (id) => { return Team.findById(id) }
exports.post = (data) => { return Team.create(data) }
exports.put = (id, data) => { return Team.findByIdAndUpdate(id, data, { new: true }) }
exports.delete = (id) => { Team.findByIdAndRemove(id) }