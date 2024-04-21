const express = require("express");
const { userRegister, userLogin } = require("../controllers/userController");

const router = express.Router();

// user register
router.post("/register", userRegister);

// user login
router.post("/login", userLogin);

module.exports = router;
