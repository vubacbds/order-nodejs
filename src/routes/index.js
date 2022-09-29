const productRouter = require("./product");
const billRouter = require("./bill");
const userRouter = require("./user");

function route(app) {
  app.use("/product", productRouter);
  app.use("/bill", billRouter);
  app.use("/user", userRouter);
}

module.exports = route;
