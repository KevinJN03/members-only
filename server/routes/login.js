var passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../model/User");
const express = require("express");
const router = express.Router();
const Controller = require("../controller/loginController");
router.get("/", (req, res) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) res.status(401).send("no User Exists");

    req.logIn(user, (err) => {
      if (err) throw err;
      // res.status(200).send("sucessfully Authenticated");
      res.send(req.user)
      //console.log(req.user);
    });
  })(req, res, next);
});
router.post("/", Controller.post_login);
module.exports = router;
