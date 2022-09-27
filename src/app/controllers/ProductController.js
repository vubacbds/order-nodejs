const Product = require("../models/Product.js");

class ProductController {
  //[GET] /product/
  async get(req, res, next) {
    await Product.find({})
      .then((item) => {
        res.status(200).json(item);
      })
      .catch((er) => next(er));
    // res.send("ok");
  }

  //[POST] /product/create
  async create(req, res, next) {
    const product = new Product(req.body);
    await product
      .save()
      .then((item) => {
        res.status(200).json(item);
      })
      .catch((err) => {
        res.status(500).json({
          message: "Thêm sản phẩm không thành công!",
          error: { next },
        });
      });
  }

  //[PUT] /product/update/:id
  async update(req, res, next) {
    await Product.updateOne({ _id: req.params.id }, req.body)
      .then((item) => {
        res.status(200).json(item);
      })
      .catch((next) =>
        res.status(200).json({
          message: "Cập nhật sản phẩm thất bại",
        })
      );
  }

  //[DELETE] /product/delete/:id
  async destroy(req, res, next) {
    await Product.deleteOne({ _id: req.params.id })
      .then(() => {
        res.status(200).json({
          message: "Xóa sản phẩm thành công",
        });
      })
      .catch(next);
  }
}

module.exports = new ProductController();
