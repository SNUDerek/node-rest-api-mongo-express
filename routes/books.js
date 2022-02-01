const router = require('express').Router()
const Book = require('../models/book')

// GET all books using async
router.get('/', async (req, res) => {
    console.log('GET books')
    try{
        const books = await Book.find()
        res.json(books)
    } catch(err){
        console.error(err)
        res.status(500).send(error)
    }
})

// POST new book
router.post('/', async (req, res) => {
    const book = new Book({
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre,
        isbn: req.body.isbn,
        publisher: req.body.publisher,
        description: req.body.description
    })
    try{
        console.log('POST book')
        const savedBook = await book.save()
        res.status(201).json(savedBook)
    } catch(err){
        console.error(err)
        res.status(400).send(err)
    }
})

// GET specfic book
router.get('/:bookId', async (req, res) => {
    try{
        console.log(`GET book ${req.params.bookId}`)
        const result = await Book.findById(req.params.bookId)
        res.json(result)
    } catch(err){
        console.error(err)
        res.status(500).send(error)
    }
})

// PATCH specific book
router.patch('/:bookId', async (req, res) => {
    try{
        console.log(`PATCH book ${req.params.bookId}`)
        const updatedBook = await Book.updateOne(
            {_id: req.params.bookId}, 
            {$set: req.body}
        )
        res.json(updatedBook)
    } catch(err){
        console.error(err)
        res.status(500).send(error)
    }
})

// DELETE specific book
router.delete('/:bookId', async (req, res) => {
    try{
        console.log(`DELETE post ${req.params.bookId}`)
        const removedBook = await Book.deleteOne({_id: req.params.bookId})
        res.json(removedBook)
    } catch(err){
        console.error(err)
        res.status(500).send(error)
    }
})

module.exports = router
