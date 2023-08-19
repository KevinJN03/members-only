var passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../model/User");
const express = require("express");
const router = express.Router();
const Controller = require("../controller/loginController");
router.get("/", Controller.get_login);
router.post("/", Controller.post_login);
module.exports = router;
