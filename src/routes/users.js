const express = require('express')
const Route = express.Router()

const User = require('../controller/user')
const Auth = require('../helpers/auth')

Route
  .get('/user', Auth.authInfo, Auth.accesstoken, User.getUsers)
  .get('/user/:userid', Auth.authInfo, User.userDetail)
  .delete('/user/member/:userid', Auth.authInfo, User.deleteMember)
  .post('/user/register', Auth.authInfo, User.register)
  .post('/user/login', Auth.authInfo, User.login)


module.exports = Route