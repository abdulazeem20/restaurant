const path = require("path");
const Database = require(path.resolve("class", "Database"));
const db = new Database();
module.exports = class User {
  constructor(props = {}) {
    this.props = props;
  }

  async saveUser() {
    try {
      let connection = await db.connect();
      let [data] = await connection.execute(
        "INSERT INTO users(firstname,lastname,email,password) VALUES(?,?,?,?)",
        [
          this.props.firstname,
          this.props.lastname,
          this.props.email,
          this.props.password,
        ]
      );
      return true;
    } catch (error) {
      console.log(error);
    }
  }

  async getUser() {
    try {
      let connection = await db.connect();
      let [data] = await connection.execute(
        "SELECT * FROM users WHERE email = ?",
        [this.props.email]
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async checkIfExists(column, value) {
    try {
      let connection = await db.connect();
      let [data] = await connection.execute(
        `SELECT COUNT(*) total FROM users WHERE ${column}=?`,
        [value]
      );
      let result = data[0].total;
      return result;
    } catch (error) {
      console.log(error);
    }
  }
};
