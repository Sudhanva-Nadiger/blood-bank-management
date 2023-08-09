const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()

app.use(express.json())
app.use(cors())

const dbConfig = require('./config/dbConfig')
const usersRoute = require('./routes/usersRoute')

app.use('/api/users', usersRoute)

const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log('Server is up and running in', port);
})

