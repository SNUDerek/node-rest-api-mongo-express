require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()


// middleware
app.use(cors())
app.use(express.json())

const User = require('./models/user')
const authRouter = require('./routes/auth')
const booksRouter = require('./routes/books')
const verify = require('./verifyToken') 

app.use('/api/user', authRouter)
app.use('/books', booksRouter)


// routes
app.get('/', (req, res) => {
    res.send('Home')
})

// public test endpoint
app.get('/hello', (req, res) => {
    res.json({"hello": "world"})
})

// private test endpoint with auth check
app.post('/helloauth', verify, async (req, res) => {
    const userInfo = await User.findOne({ _id: req.userId })
    res.json({"hello": userInfo.username})
})


// start mongodb & then start listening on callback ok
const appPort = process.env.API_PORT || 5000
function startupCallback (appPort) {
    console.log('connected to database')
    app.listen(appPort, () => console.log(`server started on port ${appPort}`))
}
console.log(`mongo url: ${process.env.DB_URL}`)
mongoose.connect(process.env.DB_URL, startupCallback(appPort))
const db = mongoose.connection
db.on('error', (err) => console.error(err))

