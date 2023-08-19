const express = require("express");
const passport = require("passport");
const router = express.Router();
const Message = require("../model/Message");
const User = require("../model/User");
require("dotenv").config();
const { body, validationResult, matchedData } = require("express-validator");
const asyncHandler = require("express-async-handler");

const ACCESS_CODE = process.env.ACCESS_CODE;

router.get("/", async (req, res, next) => {
  console.log("is user Authenticated", req.isAuthenticated());

  if (!req.isAuthenticated()) {
    return res.status(401).send("UnAuthenticated")
  } else {
    
    res.send({ user: req.user });
  }
});

const access_post = [
  body("access").trim().escape().custom(async (value) => {
if(value != ACCESS_CODE){
  throw new Error("Invalid Access Code")
}
  }),
  asyncHandler(async(req, res, next) => {
    const result = validationResult(req);

    if (!result.isEmpty()) {
      return res.status(404).send(result.errors);
    }

  if (!req.user) {
    return res.status(401).send("UnAuthenticated");
  }
  await User.findByIdAndUpdate(req.user._id, { access: true });
  res.status(200).send("Access Gained");

  }),
];
router.post("/access", access_post)
module.exports = router;
