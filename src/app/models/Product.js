const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const slug = require("mongoose-slug-generator"); //Tạo slug kiểu bỏ hết dấu nối liền lại có dấu gạch ngang,
mongoose.plugin(slug);

const Product = new Schema(
  {
    name: { type: String, default: "" },
    description: { type: String, default: "" },
    price: { type: Number, default: 0 },
    images: [],
    slug: { type: String, slug: "name", unique: true }, //Tạo slug từ trường name,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("product", Product);
