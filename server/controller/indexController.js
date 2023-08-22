
require("dotenv").config();
const { body, validationResult, matchedData } = require("express-validator");
const User = require("../model/User");
const asyncHandler = require("express-async-handler");
const ACCESS_CODE = process.env.ACCESS_CODE;

exports.access_post = [
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
  await User.findByIdAndUpdate(req.user.id, { access: true });
  res.status(200).send("Access Gained");

  }),
];

