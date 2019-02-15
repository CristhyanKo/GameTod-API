const mongoose = require('mongoose')

const RoomSchema = new mongoose.Schema({
    game: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Game',
        required: true
    },
    team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team',
        required: true
    },
    limitUsers: {
        type: Number,
        default: 0,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    status: {
        type: ['ABERTO', 'EM_JOGO', 'FECHADO'],
        default: 'ABERTO'
    },
    open: {
        type: Date,
        default: Date.now
    },
    close: Date,
    createdAt: {
        type: Date,
        default: Date.now
    }
})

mongoose.model('Room', RoomSchema)