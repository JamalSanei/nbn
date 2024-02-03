const warehouseService = require("./wearhouseService");
const productService = require("./productService");
const cartModel = require("../models/cartModel");
async function addCart(body) {
  let message;
  let result = true;
  const productId = body["productId"];
  const phone = body["phone"];
  console.log(`addCart \n prductId:${productId} \n phone:${phone} `);
  //check exist product
  const checkCountProduct = await warehouseService.checkCountProduct(productId);
  console.log(`checkCountProduct : ${checkCountProduct}`);
  const product = await productService.get(body.productId);
  console.log(`product  discount(true: 1, false: 0 ): ${product.discount}`);
  const checkHistoryCart = await cartModel.checkUserCart(phone, productId);
  console.log(
    `check History bought product by user : ${checkHistoryCart.count}`
  );

  if (checkCountProduct > 0) {
    //----- have off
    if (product.discount) {
      //-----------check befor buy with user
      if (checkHistoryCart.count) {
        message =
          "this product have discount and customer previous bought this product";
        result = false;
      } else {
        await cartModel.add(phone, productId);
        message = " register this cart";
      }
    } else {
      await cartModel.add(phone, productId);
      message = " register this cart";
    }
  } else {
    message = "product not have stock";
    result = false;
  }

  return { result, message };
}

module.exports = { addCart: addCart };
