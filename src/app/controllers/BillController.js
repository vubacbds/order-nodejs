const Bill = require("../models/Bill.js");

class ProductController {
  //[GET] /bill/
  async get(req, res, next) {
    await Bill.find({})
      .then((item) => {
        res.status(200).json(item);
      })
      .catch((er) => next(er));
    // res.send("ok");
  }

  //[POST] /bill/create
  async create(req, res, next) {
    const bill = new Bill(req.body);
    await bill
      .save()
      .then((item) => {
        res.status(200).json(item);
      })
      .catch((err) => {
        res.status(500).json({
          message: "Thêm hóa đơn thất bại!",
          error: { next },
        });
      });
  }

  //[PUT] /bill/update/:id
  async update(req, res, next) {
    await Bill.updateOne({ _id: req.params.id }, req.body)
      .then((item) => {
        res.status(200).json(item);
      })
      .catch((next) =>
        res.status(200).json({
          message: "Cập nhật hóa đơn thất bại",
        })
      );
  }

  //[DELETE] /bill/delete/:id
  async destroy(req, res, next) {
    await Bill.deleteOne({ _id: req.params.id })
      .then(() => {
        res.status(200).json({
          message: "Xóa sản phẩm thành công",
        });
      })
      .catch(next);
  }
}

module.exports = new ProductController();
