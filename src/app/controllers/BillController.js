const Bill = require("../models/Bill.js");
const mailer = require("../../util/mailer");
const moment = require("moment"); //Định dạng thời gian

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
    //Lưu vào DB
    const bill = new Bill(req.body);
    await bill
      .save()
      .then((item) => {
        res.status(200).json(item);
        //Gửi email đến admin
        const product_detail = item.detail.map((item) => {
          return (item = {
            ...item,
            price: item.price.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            }),
          });
        });
        mailer.sendMail(
          "vubacbds@gmail.com",
          process.env.MAIL_TITLE || "Có khách đặt nước !",
          {
            table: item.table,
            products: product_detail,
            total_price: item.total_price.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            }),
            time: moment(item.createdAt).format("DD/MM/yyyy hh:mm:ss  A"),
          }
        );
      })
      .catch((err) => {
        res.status(500).json({
          message: "Đặt thất bại!",
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
