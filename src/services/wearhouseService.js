const warehouseModel = require("../models/warehouseModel");
async function checkCountProduct(productId) {
  const count = await warehouseModel.get(productId);
  return count;
}

module.exports = {
  checkCountProduct: checkCountProduct,
};
