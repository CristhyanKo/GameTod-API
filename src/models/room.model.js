const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')

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
        type: String,
        enum: ['ABERTO', 'EM_JOGO', 'FECHADO'],
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

RoomSchema.plugin(mongoosePaginate)

mongoose.model('Room', RoomSchema)