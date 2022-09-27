const express = require("express");
const router = express.Router();

const productController = require("../app/controllers/ProductController");

router.get("/get", productController.get);
router.post("/create", productController.create);
router.put("/update/:id", productController.update);
router.delete("/delete/:id", productController.destroy);

module.exports = router;
