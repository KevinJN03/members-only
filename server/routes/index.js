const express = require("express");
const passport = require("passport");
const router = express.Router();
const Message = require("../model/Message");
const User = require("../model/User");
const Controller = require("../controller/indexController")
require("dotenv").config();
const { body, validationResult, matchedData } = require("express-validator");
const asyncHandler = require("express-async-handler");

const ACCESS_CODE = process.env.ACCESS_CODE;


router.post("/access", passport.authenticate("jwt", { session: false }), Controller.access_post)
module.exports = router;
