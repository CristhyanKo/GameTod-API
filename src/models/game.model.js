const mongoose = require('mongoose')

const GameSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    url: String,
    image: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
})

mongoose.model('Game', GameSchema)