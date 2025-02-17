const express = require("express");
const router = express.Router();
const {authentication}=require("../middlewares/authentication")

const OrderController = require("../controllers/OrderController")

router.post("/createOrder",authentication, OrderController.createorder)


module.exports = router;