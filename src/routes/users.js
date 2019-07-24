const express = require('express')
const Route = express.Router()

const book = require('../controller/books')
const borrow = require('../controller/borrow');
const UserController = require('../controller/user')
const Auth = require('../helpers/auth')

Route
  // .all('/*', Auth.authInfo)
  .get('/book', book.getBooks)
  .get('/book/:idBook', book.listById)
  .get('/book/search', book.searchBooks)
  .post('/book', book.addBook)
  .patch('/book/:idBook', book.updateBook)
  .delete('/:idBook', book.deleteBook)

  .get('/borrow', borrow.getAll)
  .post('/borrow',Auth.authInfo, Auth.accesstoken,borrow.post)
  .patch('/borrow/:idBook', Auth.authInfo, Auth.accesstoken,borrow.update)

  .get('/user', Auth.authInfo, Auth.accesstoken, UserController.getUsers)
  .get('/user/:userid', UserController.userDetail)
  .post('/user/register', UserController.register)
  .post('/user/login',  UserController.login)


module.exports = Route