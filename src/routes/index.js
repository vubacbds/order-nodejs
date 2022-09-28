const productRouter = require("./product");
const billRouter = require("./bill");

function route(app) {
  app.use("/product", productRouter);
  app.use("/bill", billRouter);
}

module.exports = route;
