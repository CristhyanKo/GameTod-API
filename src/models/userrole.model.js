const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')
const config = require('../config')

const UserRoleSchema = new mongoose.Schema({

    role: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role',
        default: []
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
})

UserRoleSchema.plugin(mongoosePaginate)

mongoose.model('UserRole', UserRoleSchema)