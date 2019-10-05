const mongoose = require('mongoose')
const validator = require('validator')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        minlength: 4,
        required: true
    },
    password: {
        type: String,
        minlength: 6,
        required: true

    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (value) {
                return validator.isEmail(value)
            },
            message: function () {
                return 'not a valid email'
            }
        }
    },
    role: {
        type: String,
        default: 'customer'
    },
    tokens: [{
        token: {
            type: String
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }
    ],
    addresses: [
        {
            city: {
                type: String
            },
            state: {
                type: String
            },
            Flat: {
                type: String
            }
        }
    ],
    mobile: {
        type: Number
    }
})

userSchema.pre('save', function (next) {
    const user = this
    if (user.isNew) {
        bcryptjs.genSalt(10)
            .then(salt => {
                bcryptjs.hash(user.password, salt)
                    .then(encrypedPass => {
                        user.password = encrypedPass
                        next()
                    })
            })

    }
    else {
        next()
    }
})

userSchema.statics.findByToken = function (token) {
    let tokenData
    try {
        tokenData = jwt.verify(token, 'harsh@dhaliwal')
    }
    catch (err) {
        return Promise.reject(err)
    }
    return User.findOne({ _id: tokenData._id, 'tokens.token': token })
}

userSchema.statics.findByCredentials = function (email, password) {
    const User = this
    return User.findOne({ email })
        .then((user) => {
            if (user) {
                return bcryptjs.compare(password, user.password)
                    .then(result => {
                        if (result) {
                            return Promise.resolve(user)
                        }
                        else {
                            return Promise.reject('invalid email/password')
                        }
                    })

            }
            else {
                return Promise.reject('invalid email/password')
            }
        })
        .catch(err => {
            return Promise.reject(err)
        })
}

userSchema.methods.generateToken = function () {

    const user = this
    const tokenData = {
        _id: user._id,
        username: user.username,
        createdAt: Number(new Date())
    }
    const token = jwt.sign(tokenData, 'harsh@dhaliwal')
    user.tokens.push({ token })

    return user.save()
        .then(user => {

            return Promise.resolve({ _id: user._id, username: user.username, token: token })
        })
        .catch(err => {
            return Promise.reject(err)
        })

}


const User = mongoose.model('User', userSchema)

module.exports = User