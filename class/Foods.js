const path = require("path");
const Database = require(path.resolve("class", "Database"));
const db = new Database();
module.exports = class Foods {
  constructor() {}

  async getAllCategories() {
    try {
      let connection = await db.connect();
      let [data] = await connection.execute("SELECT * FROM category");
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async getTotalNumberOfFoodsIncart(email) {
    try {
      let connection = await db.connect();
      let [data] = await connection.execute(
        "SELECT COUNT(*) total FROM cart WHERE user = ?",
        [email]
      );
      return data.length > 0 ? data : [{ total: 0 }];
    } catch (error) {
      console.log(error);
    }
  }

  async getFoodsInCart(email) {
    try {
      let connection = await db.connect();
      let [data] = await connection.execute("CALL getUsersCart(?)", [email]);
      return data[0].length > 0 ? data[0] : [{ success: true }];
    } catch (error) {
      console.log(error);
    }
  }

  async addToCart(id, email) {
    try {
      let connection = await db.connect();
      let [data] = await connection.execute(
        "INSERT INTO cart(food_id,user) VALUES(?,?)",
        [id, email]
      );
      return { success: true };
    } catch (error) {
      console.log(error);
    }
  }

  async updateQuantity(id, quantity, email) {
    try {
      let connection = await db.connect();
      let [data] = await connection.execute(
        "UPDATE cart SET quantity = ? WHERE food_id =? AND user = ?",
        [quantity, id, email]
      );
      return { success: true };
    } catch (error) {
      console.log(error);
    }
  }

  async deleteFromCart(id, email) {
    try {
      let connection = await db.connect();
      let [data] = await connection.execute(
        "DELETE FROM cart WHERE food_id = ? AND user = ?",
        [id, email]
      );
      return { success: true };
    } catch (error) {
      console.log(error);
    }
  }

  async getAllFoods() {
    try {
      let connection = await db.connect();
      let [data] = await connection.execute("SELECT * FROM foods");
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async getFoodDetail(id) {
    try {
      let connection = await db.connect();
      let [data] = await connection.execute(
        "SELECT * FROM foods WHERE id = ?",
        [id]
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async getSpecificFoods(cat) {
    try {
      let connection = await db.connect();
      let [data] = await connection.execute(
        "SELECT * FROM foods WHERE category = ?",
        [cat]
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  }
};
