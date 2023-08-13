const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()

app.use(express.json())
app.use(cors())

const dbConfig = require('./config/dbConfig')
const usersRoute = require('./routes/usersRoute')
const inventoryRoute = require('./routes/inventoryRoute')
const dashboardRoute = require('./routes/dashboardRoute')

app.use('/api/users', usersRoute)
app.use('/api/inventory', inventoryRoute)
app.use('/api/dashboard', dashboardRoute)

const port = process.env.PORT || 5000

// deployment config
const path = require("path");
__dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
  });
}

app.listen(port, () => {
    console.log('Server is up and running in', port);
})

