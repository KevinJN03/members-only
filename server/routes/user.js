const express = require("express");
const router = express.Router();
const User = require("../model/User");

router.get("/", async (req, res, next) => {
  res.json({ user: req.user });
});

module.exports = router;
