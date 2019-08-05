const express = require('express')
const Route = express.Router()

const book = require('../controller/books')
const Auth = require('../helpers/auth')

Route
    .get('/book', book.getBooks)
    .get('/book/:idBook', book.listById)
    .get('/book/search', book.searchBooks)
    .post('/book', book.addBook)
    .patch('/book/:idBook', book.updateBook)
    .delete('/:idBook', book.deleteBook)


module.exports = Route