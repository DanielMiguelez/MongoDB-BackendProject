const express = require("express");
const router = express.Router();

const ProductController = require("../controllers/ProductController")

router.post("/createProduct", ProductController.createProduct)
router.get("/getAllProducts", ProductController.getAllProducts)
router.get("/getById/:_id", ProductController.getById)
router.get("/getProductByName/:name", ProductController.getProductsByName)
router.delete("/delete/:_id", ProductController.delete)
router.put("/updateById/:_id", ProductController.update)

module.exports = router;