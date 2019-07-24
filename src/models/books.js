const connection = require('../config/connect')

//object constructor
var book = function book(data) {
  (this.name = data.name), (this.writer = data.writer),
    (this.idCat = data.idCat), (this.description = data.description),(this.location = data.location), (this.Image = data.image),(this.StatusBorrow=0 )
};

book.getBooks = (search, page) => {
  return new Promise((resolve, reject) => {
      if (search) {
          connection.query("SELECT books.idBook,books.name,books.writer,category.category,books.location,books.image,books.StatusBorrow FROM books INNER JOIN category ON  books.idCat = category.idCat WHERE books.location LIKE ? OR category.category LIKE ? OR books.name LIKE ? ORDER BY idBook desc", [`%${search}%`, `%${search}%`, `%${search}%`], (err, result) => {
              if (!err) {
                  resolve(result)
              } else {
                  reject(new Error(err))
              }
          })
      } else if (page) {

          connection.query("SELECT books.idBook,books.name,books.writer,category.category,books.location,books.image,books.StatusBorrow FROM books INNER JOIN category ON books.idCat = category.idCat ORDER BY idBook desc LIMIT " + (page * 12 - 12) + ", 12", (err, result) => {
              if (!err) {
                  resolve(result)
              } else {
                  reject(new Error(err))
              }
          })

      } else {
          connection.query('SELECT books.idBook,books.name,books.writer,category.category,books.location,books.image,books.StatusBorrow FROM books INNER JOIN category ON books.idCat = category.idCat ORDER BY idBook desc', (err, result) => {
              if (!err) {
                  resolve(result)
              } else {
                  reject(new Error(err))
              }
          })
      }

  })
},
  book.getListById = (idBook, result) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT books.idBook,books.name,books.writer,category.category,books.location,books.image,books.description,books.StatusBorrow
        FROM books 
        INNER JOIN category
        ON books.idCat = category.idCat
				WHERE books.idBook = ?`,
        Number(idBook),
        (err, res) => {
          if (!err) {
            resolve(res);
          } else {
            reject(new Error(err));
          }
        }
      );
    })
  },

  book.addBook = (newBook, result) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO books SET ?', newBook, (err, result) => {
        if (!err) {
          console.log(result)
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  book.updateBook = (updateBook, book_id) => {
    return new Promise((resolve, reject) => {
      connection.query('UPDATE books SET ? WHERE idBook = ?', [updateBook, Number(book_id)], (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  book.deleteBook = (book_id) => {
    return new Promise((resolve, reject) => {
      connection.query('DELETE FROM books WHERE idBook = ?', book_id, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  book.searchBooks = (search) => {
    return new Promise((resolve, reject) => {
      const category = `%${search}%`
      const name = `%${search}%`
      const location = `%${search}%`
      connection.query(`SELECT books.idBook,books.name,books.writer,category.category,books.location,books.image
      FROM books 
      INNER JOIN category
      ON books.idCat = category.idCat WHERE category LIKE ? OR name LIKE ? OR location LIKE ?`, [category, name, location], (err, result) => {
          if (!err) {
            resolve(result)
          } else {
            reject(new Error(err))
          }
        })
    })
  },
  





  module.exports = book;