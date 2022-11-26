const mysql = require('mysql2/promise')

module.exports = class Database {
  constructor () {}
  async connect () {
    try {
      const connection = await mysql.createConnection({
        host: 'localhost',
        database: 'restaurant',
        user: 'root',
        password: 'sijuade'
      })
      return connection
    } catch (error) {
      console.log(error)
    }
  }
}
