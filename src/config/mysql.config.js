require("dotenv").config();
const { env } = process;
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: env.DB_HOST,
  port: env.DB_PORT,
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
});
connection.connect((err) => {
  if (err) return console.error(err.message);
  console.log("Connected to the MySQL server.");
});

function cursor(query, res) {
  try {
    connection.query(query, res);
  } catch (err) {
    console.log(err);
  }
}

module.exports = { cursor: cursor };
