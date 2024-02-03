const productService = require("../services/productService");
// const { getBody } = require("./index");
const getAll = async (req, res) => {
  const products = await productService.getAll();
  res.setHeader("Content-Type", "application/json");
  res.writeHead(200);
  res.write(products);
  res.end();
};

module.exports = {
  getAll: getAll,
};
