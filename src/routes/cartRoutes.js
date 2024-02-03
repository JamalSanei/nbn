const cartController = require("../controllers/cartController");

const routes = (req, res) => {
  if (req.url === "/cart") {
    if (req.method === "POST") {
      cartController.addCartController(req, res);
    }
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end("Not found");
  }

  return res;
};

module.exports = {
  routes: routes,
};
