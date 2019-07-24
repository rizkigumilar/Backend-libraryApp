const book = require('../models/books')
const resultRespon = require('../helpers/helper')


  exports.listById = (req, res) => {
    const idBook = req.params.idBook;
    book.getListById(idBook)
      .then((resultBook) => {
        resultRespon.response(res, resultBook, 200);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  exports.addBook = (req, res) => {
    let newBook = new book(req.body);
    book.addBook(newBook)
      .then(() => {
        resultRespon.response(res, newBook, 200);
      })
      .catch((err) => {
        console.log(err);
      })
  },

  exports.updateBook = (req, res) => {
    const book_id = req.params.idBook

    const updateBook = new book(req.body)

    book.updateBook(updateBook, book_id)
      .then((resultUser) => {
        const result = resultUser[0]
        resultRespon.response(res, updateBook, 200)
      })
      .catch((error) => {
        console.log(error)
      })
  },

  exports.deleteBook = (req, res) => {
    const book_id = req.params.idBook

    book.deleteBook(book_id)
      .then((resultUser) => {
        const result = resultUser[0]
        resultRespon.response(res, book_id, 200)
      })
      .catch((error) => {
        console.log(error)
      })
  },

  exports.searchBooks = (req, res) => {
    const search = req.query.search || ''

    book.searchBooks(search)
      .then((resultBook) => {
        const result = resultBook
        resultRespon.response(res, result, 200)
      })
      .catch((error) => {
        console.log(error)
      })
  },

exports.getBooks = (req, res) => {
    var jumlah = 0
    book.getBooks()
        .then((resultBook) => {
            jumlah = resultBook.length
        })
    const search = req.query.search || ''
    const page = req.query.page
    book.getBooks(search, page)
        .then((resultBook) => {
            const result = resultBook
            // console.log(result);
            resultRespon.response(res, result, 200, jumlah)
        })
        .catch((error) => {
            console.log(error)
        })
}