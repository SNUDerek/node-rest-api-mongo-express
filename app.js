require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()

// middleware
app.use(cors())
app.use(express.json())

// routes
const postsRouter = require('./routes/posts')
app.use('/posts', postsRouter)

app.get('/', (req, res) => {
    res.send('we are at home')
})

app.get('/json', (req, res) => {
    console.log('test middleware for json')
    res.json({"hello": "world"})
})

// mongodb
console.log(`mongo url: ${process.env.DB_URL}`)
mongoose.connect(process.env.DB_URL, () => console.log('connected to database'))
const db = mongoose.connection
db.on('error', (err) => console.error(err))

// start listening
const appPort = process.env.API_PORT || 6969
app.listen(appPort, () => console.log(`server started on port ${appPort}`))