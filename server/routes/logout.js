const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      res.status(200).send(req.user);
    });
  });

  module.exports = router