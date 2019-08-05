const express = require('express')
const Route = express.Router()

const borrow = require('../controller/borrow');
const Auth = require('../helpers/auth')

Route
    .get('/borrow', borrow.getAll)
    .get('/profile/:idNum', borrow.userBorrow)
    .post('/borrow', borrow.post)
    .patch('/borrow/:idBook', borrow.update)


module.exports = Route