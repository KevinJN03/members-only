const express = require("express");
const router = express.Router();
const User = require("../model/User");
const passport = require("passport");
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    const { access, _id, email, first_name } = req.user;
    res.status(200).json({
      success: true,
      user: {
        id: _id,
        access,
        email,
        first_name,
      },
    });
  }
);

module.exports = router;
