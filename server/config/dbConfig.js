const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URL)

const connection = mongoose.connection

// verify connection
connection.on('connected', () => {
    console.log('connection successfull');
})

connection.on('error', (err) => {
    console.log(err);
})