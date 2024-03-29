const connection = require('../config/connect')

module.exports = {
  getUsers: (callback) => {
    connection.query(`SELECT * FROM users `, (err, result) => {
      if (err) console.log(err)

      callback(err, result)
    })
  },

  userDetail: (userid) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM users WHERE userid = ?', userid, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  deleteMember: userid => {
    return new Promise((resolve, reject) => {
      connection.query('DELETE FROM users WHERE userid = ?', userid, (err) => {
        if (!err) {
          resolve(`User dengan Id : ${userid} berhasil di Hapus`)
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

  getByEmail: (email, token) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT userid, email, fullname, idNum, status, created_at, updated_at, salt, password FROM users WHERE email = ?', email, (err, result) => {
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