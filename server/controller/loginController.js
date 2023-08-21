var passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../model/User");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
require("../config/passportConfig")(passport);
const issueJwt = require("../libs/utils");
exports.post_login = function (req, res, next) {
    User.findOne({ email: req.body.email })
      .then((user) => {
        if (!user) {
          res.status(401).json({ success: false, msg: "could not find user" });
        }
        const match = bcrypt.compare(req.body.password, user.password);

        if (match) {
          const tokenObject = issueJwt(user);
          res
            .status(200)
            .json({ success: true, token: tokenObject });
        } else {
          res
            .status(401)
            .json({ success: false, msg: "You enter the wrong password" });
        }
      })
      .catch((err) => {
        next(err);
      });
  },


exports.get_login = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    // if (err) throw err;
    if (err) next(err);
    if (!user) return res.status(401).send("no User Exists");

    req.logIn(user, (err) => {
      if (err) next(err);
      //if (err) throw err;
      // res.status(200).send("sucessfully Authenticated");
      return res.send(req.user);
      //console.log(req.user);
    });
  })(req, res, next);
};
