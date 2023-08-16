const express = require("express");
const router = express.Router();
const Controller = require("../controller/signupController");

router.post("/", Controller.signUp_post);

module.exports = router;
