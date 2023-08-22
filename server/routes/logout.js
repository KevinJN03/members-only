const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {

  req.logout(function (err) {
      if (err) {
        next(err);
      }
     res.send("logged Out");
    });

    
  });

  module.exports = router