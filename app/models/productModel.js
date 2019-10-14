const mongoose = require('mongoose')

const Schema = mongoose.Schema

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 3
    },
    description: {
        type: String,
        required: true

    },
    price: {
        type: Number,
        required: true
    },
    categoryId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Category'
    },
    isAvailable: {
        type: Boolean,
        default: true
    },
    stock: {
        type: Number,
        required: true
    },
    images: [
        { type: String }
    ],
    rating: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            title: { type: String, required: true },
            userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
            rating: { type: Number },
            date: { type: Date }
        }
    ],
    sellerId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product