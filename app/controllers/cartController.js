const Cart = require('../models/cartModel')

module.exports.create = (req, res) => {
    const body = req.body
    if (body.quantity >= 1) {
        Cart.findOne({ userId: req.user._id, productId: body.productId })
            .then(prevCart => {
                if (prevCart) {
                    prevCart.quantity = body.quantity
                    prevCart.save()
                        .then((cart) => {
                            Cart.find({ userId: req.user._id }).populate('productId')
                                .then(cart => {
                                    res.json(cart)
                                })
                                .catch(err => {
                                    res.json(err)
                                })
                        })
                        .catch(err => {
                            res.json(err)
                        })

                } else {
                    const cart = new Cart({ userId: req.user._id, productId: body.productId, quantity: body.quantity })
                    cart.save()
                        .then(cart => {
                            Cart.find({ userId: req.user._id }).populate('productId')
                                .then(cart => {
                                    res.json(cart)
                                })
                                .catch(err => {
                                    res.json(err)
                                })
                        })
                        .catch(err => {
                            res.json(err)
                        })
                }
            })
            .catch(err => {
                res.json(err)
            })
    } else {
        res.json({ err: 'quantity error' })
    }

}

module.exports.show = (req, res) => {
    Cart.find({ userId: req.user._id }).populate('productId')
        .then(cart => {
            res.json(cart)
        })
        .catch(err => {
            res.json(err)
        })
}

module.exports.remove = (req, res) => {
    const id = req.params.id
    console.log(id)
    Cart.findByIdAndDelete(id)
        .then(cart => {
            Cart.find({ userId: req.user._id }).populate('productId')
                .then(cart => {

                    res.json(cart)
                })
                .catch(err => {
                    res.json(err)
                })
        })
        .catch(err => {
            res.json(err)
        })
}

