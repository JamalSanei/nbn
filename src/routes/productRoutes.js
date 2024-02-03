const productController = require("../controllers/productController");

const routes = (req, res) => {
  if (req.url === "/product" && req.method === "GET") {
    productController.getAll(req, res);
  } else if (req.url === "/product" && req.method === "POST") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end("[]");
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
  return res;
};

module.exports = {
  routes: routes,
};
