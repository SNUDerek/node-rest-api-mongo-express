require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()

// middleware
app.use(cors())
app.use(express.json())

// routes
const booksRouter = require('./routes/books')
app.use('/books', booksRouter)

app.get('/', (req, res) => {
    res.send('we are at home')
})

app.get('/json', (req, res) => {
    res.json({"hello": "world"})
})

// mongodb
console.log(`mongo url: ${process.env.DB_URL}`)
mongoose.connect(process.env.DB_URL, () => console.log('connected to database'))
const db = mongoose.connection
db.on('error', (err) => console.error(err))

// start listening
const appPort = process.env.API_PORT || 5000
app.listen(appPort, () => console.log(`server started on port ${appPort}`))