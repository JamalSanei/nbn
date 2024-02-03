const cart = require("./cartRoutes");
const product = require("./productRoutes");
const warehouse = require("./warehouseRoutes");

async function routes(req, res) {
  console.log("router main");

  if (req.url === "/product") {
    return product.routes(req, res);
  } else if (req.url === "/cart") {
    return cart.routes(req, res);
  } else if (req.url === "/warehouse") {
    warehouse.routes(req, res);
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
  return res;
}
module.exports = { routes: routes };
