require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const Cors = require('cors')
const xssFilter = require('x-xss-protection')
const logger = require('morgan')
const app = express()
const port = process.env.PORT || 5000

const userRoute = require('./src/routes/users')
const bookRoute = require('./src/routes/books')
const borrowRoute = require('./src/routes/borrow')
// const whitelist = process.env.WHITELIST

// const corsOptions = (req, callback) => {
//   if (whitelist.split(',').indexOf(req.header('Origin')) !== -1) {
//     console.log('Success')
//     return callback(null, {
//       origin: true
//     })
//   } else {
//     console.log('Failed')
//     return callback(null, {
//       origin: false
//     })
//   }
// }

app.use(express.static(__dirname + '/src/uploads/images'))

app.use(Cors())
// app.options('*', Cors(corsOptions))
app.use(xssFilter())
app.use(logger('dev'))


app.listen(port, () => {
  console.log(`App listening to Port ${port}...`)
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))

// app.use(function (req, res, next) {
//     res.header('Access-Control-Allow-Origin', "*");
//     res.header('Access-Control-Allow-Methods', 'GET, PATCH, POST, DELETE');
//     res.header('Access-Control-Allow-Headers', 'Content-Type');
//     next();
// })

app.use('/', userRoute, bookRoute, borrowRoute)