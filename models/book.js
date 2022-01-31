const mongoose = require('mongoose')

const BookSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    genre: String,
    isbn: String,
    publisher: String,
    description: String
})

// export schema as mongoose model
module.exports = mongoose.model('Book', BookSchema)