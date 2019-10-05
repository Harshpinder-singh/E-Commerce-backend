const Cart = require('../models/cartModel')

module.exports.create = (req, res) => {
    const body = req.body
    const cart = new Cart({ userId: req.user._id, productId: body.productId, quantity: body.quantity })
    cart.save()
        .then(cart => {
            res.json(cart)
        })
        .catch(err => {
            res.json(err)
        })
}

module.exports.show = (req, res) => {
    Cart.find({ userId: req.user._id })
        .then(cart => {
            res.json(cart)
        })
        .catch(err => {
            res.json(err)
        })
}

module.exports.remove = (req, res) => {
    const id = req.params.id
    Cart.findByIdAndDelete(id)
        .then(cart => {
            res.json(cart)
        })
        .catch(err => {
            res.json(err)
        })
}

