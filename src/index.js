const express = require("express"); //Framework
const app = express();
const port = process.env.PORT || 5000;
const route = require("./routes");

//Để gửi file JSON lên DB được
app.use(express.json());

//Sửa lỗi cors khi chạy trên reactjs
const cors = require("cors");
app.use(cors());

//Kết nối database MongoDB
const db = require("./config/db");
db.connect();

//Cài Route
route(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

//Các bước cài 1 nodejs:
//1: cài node và vào cmd một thư mục mới: npm i
//2: tạo thư mục gốc: index.js
//3: cài: express
//4: cài nodemon để tự động chạy khi save, trong package.js cấu hình để gõ npm start nó chạy thư mục gốc
// "scripts": {
//   "start": "nodemon --inspect src/index.js",
// },
//5: cài mongoose để kết nối với mongodb, chạy db
//6: thêm route, thêm json: app.use(express.json());
