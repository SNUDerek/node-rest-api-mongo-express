const router = require('express').Router()
const Book = require('../models/book')

// GET search book(s) by field(s)
router.get('/', async (req, res) => {
    const query = req.query
    console.log(`GET search`)
    try{
        const books = await Book.find(query)
        res.json(books)
    } catch(err){
        console.error(err)
        res.status(500).send(error)
    }
})

module.exports = router