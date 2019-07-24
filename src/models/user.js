const connection = require('../config/connect')

module.exports = {
  getUsers: (callback) => {
    connection.query(`SELECT * FROM users`, (err, result) => {
      if (err) console.log(err)

      callback(err, result)
    })
  },

  userDetail: (userid) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM users WHERE id = ?', userid, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  register: (data) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO users SET ?', data, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },

  getByEmail: (email,token) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT userid, email, fullname, status, created_at, updated_at, salt, password FROM users WHERE email = ?', email, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
      connection.query(`UPDATE users SET token = ? WHERE userid =?`, [email, token])
    })
  }
}