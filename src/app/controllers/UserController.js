const User = require("../models/User.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class UserController {
  // [POST] /user/signup
  async signup(req, res) {
    const body = req.body;
    if (!(body.username && body.password)) {
      return res.status(400).send({ error: "Không có dữ liệu" });
    }
    const user = new User(body);
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    user.save().then(async (doc) => {
      res.status(201).send(doc);
    });
  }

  // [POST] /user/login
  async login(req, res, next) {
    try {
      await User.findOne({ username: req.body.username })
        .then((user) => {
          if (!user) {
            return res.status(400).json({
              message: "Username không tồn tại",
              error: { next },
            });
          }
          if (user && bcrypt.compareSync(req.body.password, user.password)) {
            const token = jwt.sign(
              {
                _id: user._id,
              },
              process.env.ACCESS_TOKEN_SECRET || "jwt6688",
              { expiresIn: "1d" }
            );

            res.status(200).json({
              token,
              user,
            });
          } else {
            return res.status(400).json({
              message: "Password không chính xác !",
            });
          }
        })
        .catch((next) => {
          return res.status(500).json({
            message: "Lỗi hệ thống 1",
            error: { next },
          });
        });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Lỗi hệ thống 2",
        error,
      });
    }
  }
  // [POST] /user/verify
  async verify(req, res, next) {
    await User.findOne({ username: req.body.username }).then((user) => {
      if (user && bcrypt.compareSync("6688", req.body.password)) {
        res.status(200).json({
          result: true,
        });
      } else {
        res.status(500).json({
          result: false,
        });
      }
    });
  }
}

module.exports = new UserController();
