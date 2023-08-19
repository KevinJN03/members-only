require("dotenv").config();
const User = require("../model/User");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const { body, validationResult, matchedData } = require("express-validator");
const SALT = process.env.SALT;

exports.signUp_post = [
  body("first_name", "First Name must Not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  body("last_name", "last Name must Not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  body("password", "password must not be empty")
    .trim()
    .isLength({ min: 6 })
    .escape(),

  body("email", "Must be an email")
    .trim()
    .isEmail()
    .escape()
    .custom(async (value) => {
      const user = await User.findOne({ email: value }, { email: 1 });

      if (user) {
        console.log("user: ", user);
        throw new Error(
          "Email is already registered, try with a different email"
        );
      }
    }),
  asyncHandler(async (req, res, next) => {
    const result = validationResult(req);
    console.log("result: ", result);
    if (!result.isEmpty()) {
      res.status(400).send({errors : result.errors}).end();
      return;
    }

    const { first_name, last_name, email, password } = matchedData(req);
    await bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
      if(err){
        next(err);
      }
      const user = {
        first_name,
        last_name,
        password: hashedPassword,
        email,
      };

      await User.create(user);
    });

    res.status(201).send("user created");
  }),
];
