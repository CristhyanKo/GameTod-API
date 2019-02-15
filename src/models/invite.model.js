const mongoose = require('mongoose')

const InviteSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room'
    },
    type: {
        type: ['ROOM_INVITE','FRIEND_INVITE'],
        required: true
    },
    start: {
        type: Date,
        default: Date.now
    },
    end: Date,
    createdAt: {
        type: Date,
        default: Date.now
    }
})

mongoose.model('Invite', InviteSchema)