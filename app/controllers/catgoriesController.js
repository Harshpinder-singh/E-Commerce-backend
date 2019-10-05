const Category = require('../models/categoriesModel')

module.exports.create = (req, res) => {
    const body = req.body
    const category = new Category(body)
    category.save()
        .then(category => {
            res.json(category)
        })
        .catch(err => {
            res.json(err)
        })

}

module.exports.list = (req, res) => {
    Category.find()
        .then(category => {
            res.json(category)
        })
        .catch(err => {
            res.json(err)
        })
}