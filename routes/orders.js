const express = require("express");
const router = express.Router();
const {authentication, isAuthor}=require("../middlewares/authentication")

const OrderController = require("../controllers/OrderController")

router.post("/createOrder",authentication, OrderController.createorder)
router.put("/updateOrder/:_id",authentication, isAuthor, OrderController.updateorder)

module.exports = router;