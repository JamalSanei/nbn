const productModel = require("../models/productModel");

const getAll = async function getAll() {
  const cProducts = await cache.getAsync("productList");
  if (cProducts) return cProducts;
  const products = await productModel.getAll();
  const cacheProducts = await cache.setAsync("productList", products);
  console.log(cacheProducts);
  return products;
};

const get = async function get(productId) {
  const product = await productModel.get(productId);
  return product;
};

module.exports = { getAll: getAll, get: get };
