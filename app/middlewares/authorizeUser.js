

const authorizeUser = (req, res, next) => {
    if (req.user.role == 'seller') {
        next()
    }
    else {
        res.status('402').send('not authorized')
    }

}

module.exports = {
    authorizeUser
}