const express = require("express");
const router = express.Router();

const billController = require("../app/controllers/BillController");

router.get("/get", billController.get);
router.post("/create", billController.create);
router.put("/update/:id", billController.update);
router.delete("/delete/:id", billController.destroy);

module.exports = router;
