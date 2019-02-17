const mongoose = require('mongoose')
const Room = mongoose.model('Room')

exports.get = (page) => { return Room.paginate({}, {page, limit: 10}) }
exports.getById = (id) => { return Room.findById(id) }
exports.post = (data) => { return Room.create(data) }
exports.put = (id, data) => { return Room.findByIdAndUpdate(id, data, { new: true }) }
exports.delete = (id) => { Room.findByIdAndRemove(id) }