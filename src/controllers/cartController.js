const { addCart } = require("../services/cartService");
const { getBody } = require("./index");

const addCartController = async (req, res) => {
  const body = await getBody(req);
  const { result, message } = await addCart(body);
  console.log(`result of add cart: ${result}`);
  console.log(`message of add cart: ${message}`);
  if (result) {
    res.setHeader("Content-Type", "application/json");
    res.writeHead(200);
    res.write(`{data:ok, message:${message}}`);
    res.end();
  } else {
    res.setHeader("Content-Type", "application/json");
    res.writeHead(500);
    res.end();
  }
};

module.exports = {
  addCartController: addCartController,
};
