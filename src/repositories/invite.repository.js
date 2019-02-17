const mongoose = require('mongoose')
const Invite = mongoose.model('Invite')

exports.get = () => { return Invite.find() }
exports.getById = (id) => { return Invite.findById(id) }
exports.post = (data) => { return Invite.create(data) }
exports.put = (id, data) => { return Invite.findByIdAndUpdate(id, data, { new: true }) }
exports.delete = (id) => { Invite.findByIdAndRemove(id) }