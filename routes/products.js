const express = require("express");
const router = express.Router();
const {authentication, isAdmin}=require("../middlewares/authentication")

const ProductController = require("../controllers/ProductController")

router.post("/createProduct",authentication, isAdmin, ProductController.createProduct)
router.get("/getAllProducts", ProductController.getAllProducts)
router.get("/getById/:_id", ProductController.getById)
router.get("/getProductByName/:name", ProductController.getProductsByName)
router.delete("/delete/:_id", authentication, isAdmin, ProductController.delete)
router.put("/updateById/:_id",authentication, isAdmin, ProductController.update)
router.put("/insertComment/:_id", authentication, ProductController.insertComment)

module.exports = router;