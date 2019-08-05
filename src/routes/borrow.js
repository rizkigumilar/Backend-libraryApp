const express = require('express')
const Route = express.Router()

const borrow = require('../controller/borrow');
const Auth = require('../helpers/auth')

Route
    .get('/borrow', Auth.authInfo, borrow.getAll)
    .get('/profile/:idNum', Auth.authInfo, borrow.userBorrow)
    .post('/borrow', Auth.authInfo, borrow.post)
    .patch('/borrow/:idBook', Auth.authInfo, borrow.update)


module.exports = Route