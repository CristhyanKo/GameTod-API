const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')

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

GameSchema.plugin(mongoosePaginate)

mongoose.model('Game', GameSchema)