const express = require('express')
const app = express()
const mongoose = require('./config/databaseConfig')
const cors = require('cors')
const router = require('./config/routes')



app.use(express.json())
app.use(cors())


app.use('/', router)

app.listen(3005, () => {
    console.log('listening on 3005')
})