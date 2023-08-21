const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {

  req.logout(function (err) {
      if (err) {
        return next(err);
      }
      return res.send("logged Out");
    });

    
  });

  module.exports = router