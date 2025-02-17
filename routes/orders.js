const express = require("express");
const router = express.Router();

const OrderController = require("../controllers/OrderController")

router.post("/createOrder", OrderController.createorder)


module.exports = router;