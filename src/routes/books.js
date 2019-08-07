const express = require('express')
const Route = express.Router()

const book = require('../controller/books')
const Auth = require('../helpers/auth')
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './src/uploads/images')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})
let upload = multer({ storage: storage, limits: { fileSize: 100000000 } })


Route
    .get('/book', book.getBooks)
    .get('/book/:idBook', Auth.authInfo, book.listById)
    .get('/book/cek', book.getPagination)
    .get('/book/search', Auth.authInfo, book.searchBooks)
    .post('/book', upload.single('image'), Auth.authInfo, book.addBook)
    .patch('/book/:idBook', Auth.authInfo, book.updateBook)
    .delete('/:idBook', Auth.authInfo, book.deleteBook)


module.exports = Route