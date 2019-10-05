const Order = require('../models/orderModel')

module.exports.create = (req, res) => {
    const body = req.body
    const order = new Order({ userId: req.user._id, addressId: body.addressId })
    order.save()
        .then(order => {
            res.json(order)
        })
        .catch(err => {
            res.json(err)
        })
}

module.exports.list = (req, res) => {
    Order.find({ userId: req.user._id })
        .then(orders => {
            res.json(orders)
        })
        .catch(err => {
            res.json(err)
        })
}