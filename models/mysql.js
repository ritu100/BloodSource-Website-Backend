const mysql = require('mysql')
const pool = mysql.createPool({
    host:'localhost',
    user:'nishant',
    password:"Nish@123",
    database:"Blood_Bank_System"
  })
exports.pool=pool