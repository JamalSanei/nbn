const { cursor } = require("./config/mysql.config");
const redisClient = require("./config/redis.config");
const productModel = require("./models/productModel");
const cartModel = require("./models/cartModel");
const warehouseModel = require("./models/warehouseModel");
const { routes } = require("./routes");
const http = require("http");
//--------------------------------------------------- check and initite model
cursor(productModel.model, (err, data) => {
  if (err) console.log(err);
  console.log(`INFO: product model existed check`);
});
cursor(cartModel.model, (err, data) => {
  if (err) console.log(err);
  console.log(`INFO: cart model existed check`);
});
cursor(warehouseModel.model, (err, data) => {
  if (err) console.log(err);
  console.log(`INFO: warehouse model existed check`);
});

//--------------------------------------------------- set router service and run server

const server = http.createServer((req, res) => {
  routes(req, res);
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`INFO: server Run on port ${PORT}`);
});
