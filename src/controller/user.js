const userModels = require('../models/user')
const resultRespon = require('../helpers/helper')

const jwt = require('jsonwebtoken')

module.exports = {
  getIndex: (req, res) => {
    return res.json({ message: 'Hello' })
  },

  // Using Callback
  getUsers: (req, res) => {
    userModels.getUsers((err, result) => {
      if (err) console.log(err)

      // res.json(result)
      resultRespon.response(res, result, 200)
    })
  },

  deleteMember: (req, res) => {
    const userid = req.params.userid

    userModels.deleteMember(userid)
      .then((resultBook) => {
        const result = resultBook
        resultRespon.response(res, result, 200)
      })
      .catch((error) => {
        console.log(error)
      })
  },

  // Using Promise
  userDetail: (req, res) => {
    const userid = req.params.userid

    userModels.userDetail(userid)
      .then((resultUser) => {
        const result = resultUser[0]
        resultRespon.response(res, result, 200)
      })
      .catch((error) => {
        console.log(error)
      })
  },

  register: (req, res) => {
    const salt = resultRespon.generateSalt(18)
    const passwordHash = resultRespon.setPassword(req.body.password, salt)

    const data = {
      email: req.body.email,
      fullname: req.body.fullname,
      password: passwordHash.passwordHash,
      salt: passwordHash.salt,
      token: '',
      idNum: req.body.idNum,
      status: 1,
      created_at: new Date(),
      updated_at: new Date()
    }
    console.log(data)

    userModels.register(data)
      .then((resultRegister) => {
        resultRespon.response(res, resultRegister, 200)
      })
      .catch((error) => {
        console.log(error)
        return resultRespon.response(res, null, 403, 'Email is already taken !!!')
      })
  },

  login: (req, res) => {
    const email = req.body.email
    const password = req.body.password
    const token = req.token || ' '

    userModels.getByEmail(email, token)
      .then((result) => {
        const dataUser = result[0]
        const usePassword = resultRespon.setPassword(password, dataUser.salt).passwordHash

        if (usePassword === dataUser.password) {
          dataUser.token = jwt.sign({
            userid: dataUser.userid
          }, process.env.SECRET_KEY, { expiresIn: '12h' })

          delete dataUser.salt
          delete dataUser.password

          return resultRespon.response(res, dataUser, 200)
        } else {
          return resultRespon.response(res, null, 403, 'Wrong password!')
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }
}
