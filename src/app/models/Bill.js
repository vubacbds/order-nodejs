const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const slug = require("mongoose-slug-generator"); //Tạo slug kiểu bỏ hết dấu nối liền lại có dấu gạch ngang,
mongoose.plugin(slug);

const Bill = new Schema(
  {
    table: { type: String, default: "" },
    note: { type: String, default: "" },
    detail: [{}],
    total_price: { type: Number, default: 0 },
    status: { type: Boolean, default: "" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("bill", Bill);
