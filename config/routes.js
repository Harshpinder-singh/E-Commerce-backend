const express = require('express')
const router = express.Router()
const userController = require('../app/controllers/userController')
const categoriesController = require('../app/controllers/catgoriesController')
const productsController = require('../app/controllers/productsController')
const cartController = require('../app/controllers/cartController')
const ordersController = require('../app/controllers/ordersController')
const { authenticateUser } = require('../app/middlewares/authenticateUser')
const { authorizeUser } = require('../app/middlewares/authorizeUser')


//user routes
router.post('/register', userController.register)
router.post('/login', userController.login)
router.get('/account', authenticateUser, userController.account)
router.get('/test', authenticateUser, authorizeUser, userController.account)

//categories
router.get('/categories', authenticateUser, categoriesController.list)
router.post('/categories', authenticateUser, categoriesController.create)

//products
router.get('/products', authenticateUser, productsController.list)
router.post('/products', authenticateUser, authorizeUser, productsController.create)
router.get('/products/:id', authenticateUser, productsController.show)

//cart
router.get('/cart', authenticateUser, cartController.show)
router.post('/cart', authenticateUser, cartController.create)
router.delete('/cart/:id', authenticateUser, cartController.remove)

//orders
router.get('/orders', authenticateUser, ordersController.list)
router.post('/order', authenticateUser, ordersController.create)


module.exports = router