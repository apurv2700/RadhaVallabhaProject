
const { signup, login,forgot_password } = require("../controllers/authController");
const express = require('express');
const router = express.Router();


router.post("/signup", signup);
router.post("/login", login);
router.post("/forgot-password", forgot_password);


module.exports = router;
