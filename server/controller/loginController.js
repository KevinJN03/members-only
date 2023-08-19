var passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../model/User");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
require("../config/passportConfig")(passport);

exports.post_login = [
  function (req, res, next) {
    passport.authenticate("local", (err, user, info) => {
      if (err) throw err;
      if (!user) res.status(401).send("no User Exists");

      req.logIn(user, (err) => {
        if (err) throw err;
        // res.status(200).send("sucessfully Authenticated");
    // res.redirect("/")
        res.status(200).send(req.user)
      });
    })(req, res, next);
  },
];
