const Product = require('../models/productModel')

module.exports.create = (req, res) => {
    const body = req.body
    const product = new Product(body)
    product.save()
        .then(product => {
            res.json({ product })
        })
        .catch(err => {
            res.json(err)
        })

}

module.exports.list = (req, res) => {
    Product.find()
        .then(products => {
            res.json(products)
        })
        .catch(err => {
            res.json(err)
        })
}

module.exports.show = (req, res) => {
    const id = req.params.id
    Product.findById(id)
        .then(product => {
            res.json(product)
        })
        .catch(err => {
            res.json(err)
        })
}