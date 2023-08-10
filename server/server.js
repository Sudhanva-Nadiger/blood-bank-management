const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()

app.use(express.json())
app.use(cors())

const dbConfig = require('./config/dbConfig')
const usersRoute = require('./routes/usersRoute')
const inventoryRoute = require('./routes/inventoryRoute')

app.use('/api/users', usersRoute)
app.use('/api/inventory', inventoryRoute)

const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log('Server is up and running in', port);
})

