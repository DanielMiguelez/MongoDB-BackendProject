const express = require("express");
const router = express.Router();
const {authentication, isAuthor}=require("../middlewares/authentication")

const UserController = require("../controllers/UserController")

router.post("/createUser", UserController.createUser)
router.post("/login", UserController.login)
router.delete("/logout", authentication, UserController.logout)

module.exports = router;