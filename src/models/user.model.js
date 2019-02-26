const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')
const config = require('../config')

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    secondName: {
        type: String,
        required: true
    },
    nick: {
        type: String,
        required: true
    },
    avatar: String, 
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    friends: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: []
    }],
    roles: {
        type: String,
        enum: [config.USER, config.ADMIN],
        default: config.USER,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

UserSchema.plugin(mongoosePaginate)

mongoose.model('User', UserSchema)