const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')

const MenuSchema = new mongoose.Schema({

    title: String,
    name: String,
    url: String,
    icon: String,
    badge: String,
    description: String,

    createdAt: {
        type: Date,
        default: Date.now
    }
})

MenuSchema.plugin(mongoosePaginate)

mongoose.model('Menu', MenuSchema)