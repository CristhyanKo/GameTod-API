const mongoose = require('mongoose')
const User = mongoose.model('User')
const md5 = require('md5')
const config = require('../config')

exports.authenticate = async (data) => {
    const item = await User.findOne({ email: data.email, password: data.password })
    return item
}

exports.get = () => { return User.find() }
exports.getById = (id) => { return User.findById(id) }

exports.post = (data) => {
    return User.create({
        nick: data.nick,
        avatar: data.avatar,
        password: md5(data.password + global.SALT_KEY),
        email: data.email,
        roles: [config.USER]
    })
}

exports.put = (id, data) => { return User.findByIdAndUpdate(id, data, { new: true }) }
exports.delete = (id) => {
    User.findByIdAndRemove(id)
}