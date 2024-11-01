const express = require("express");
const { RegisterUser, Login } = require("../controller/user.controller");

const router = express.Router();

router.post("/sign-up", RegisterUser);
router.post("/sign-in", Login);

module.exports = router;
