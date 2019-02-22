const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')
const config = require('../config')

const RoleSchema = new mongoose.Schema({
    role: {
        type: String,
        required: true
    },
    
    createdAt: {
        type: Date,
        default: Date.now
    }
})

RoleSchema.plugin(mongoosePaginate)

mongoose.model('Role', RoleSchema)