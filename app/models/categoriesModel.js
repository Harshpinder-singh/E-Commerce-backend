const mongoose = require('mongoose')

const Schema = mongoose.Schema

const categoriesSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    }
})

const Category = mongoose.model('Category', categoriesSchema)
module.exports = Category