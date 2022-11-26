const path = require('path')
const Database = require(path.resolve('class', 'Database'))
const db = new Database()
module.exports = class Foods {
  constructor () {}

  async getAllCategories () {
    try {
      let connection = await db.connect()
      let [data] = await connection.execute('SELECT * FROM category')
      return data
    } catch (error) {
      console.log(error)
    }
  }

  async getTotalNumberOfFoodsIncart () {
    try {
      let connection = await db.connect()
      let [data] = await connection.execute('SELECT COUNT(*) total FROM cart')
      return data
    } catch (error) {
      console.log(error)
    }
  }

  async getFoodsInCart () {
    try {
      let connection = await db.connect()
      let [data] = await connection.execute(
        'SELECT * FROM foods_in_cart WHERE in_cart = 1'
      )
      return data
    } catch (error) {
      console.log(error)
    }
  }

  async addToCart (id) {
    try {
      let connection = await db.connect()
      let [data] = await connection.execute(
        'INSERT INTO cart(food_id) VALUES(?)',
        [id]
      )
      return { success: true }
    } catch (error) {
      console.log(error)
    }
  }
  async deleteFromCart (id) {
    try {
      let connection = await db.connect()
      let [data] = await connection.execute(
        'DELETE FROM cart WHERE food_id = ?',
        [id]
      )
      return { success: true }
    } catch (error) {
      console.log(error)
    }
  }

  async getAllFoods () {
    try {
      let connection = await db.connect()
      let [data] = await connection.execute('SELECT * FROM foods_in_cart')
      return data
    } catch (error) {
      console.log(error)
    }
  }

  async getFoodDetail (id) {
    try {
      let connection = await db.connect()
      let [data] = await connection.execute(
        'SELECT * FROM foods WHERE id = ?',
        [id]
      )
      return data
    } catch (error) {
      console.log(error)
    }
  }

  async getSpecificFoods (cat) {
    try {
      let connection = await db.connect()
      let [data] = await connection.execute(
        'SELECT * FROM foods_in_cart WHERE category = ?',
        [cat]
      )
      return data
    } catch (error) {
      console.log(error)
    }
  }
}
