const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')

const TeamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    image: String,
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
})

TeamSchema.plugin(mongoosePaginate)

mongoose.model('Team', TeamSchema)