const mysql = require('mysql2')
const config = require('config')

const pool = mysql.createPool({
  host: config.get('host'),
  user: config.get('user'),
  password: config.get('password'),
  database: config.get('database'),
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10,
  idleTimeout: 60000,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
})

module.exports = pool
