const User = require('../models/userModel')

module.exports.register = (req, res) => {
    const body = req.body
    const user = new User({ username: body.username, email: body.email, password: body.password, mobile: body.mobile, role: body.role })
    user.save()
        .then(user => {
            res.json({ _id: user._id, username: user.username, email: user.email })
        })
        .catch(err => {
            res.json(err)

        })
}

module.exports.account = (req, res) => {
    const user = req.user
    const token = req.token
    res.send('profile here')
}

module.exports.login = (req, res) => {
    const body = req.body
    User.findByCredentials(body.email, body.password)
        .then((user) => {

            return user.generateToken()
        })
        .then((user) => {

            res.json(user)
        })
        .catch((err) => {
            res.json(err)
        })
}