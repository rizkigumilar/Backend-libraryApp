require('dotenv').config() // Initialize dotenv config

const mysql = require('mysql')
const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'remotemysql.com',
  user: process.env.DB_USERNAME || '9x7PHWPbol',
  password: process.env.DB_PASSWORD || 'y2qRiegUlR',
  database: process.env.DB_NAME || '9x7PHWPbol'
})

connection.connect((err) => {
  if (err) console.log(`Error: ${err}`)
})

module.exports = connection