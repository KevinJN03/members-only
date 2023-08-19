const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
if(req.user){
  req.logout(function (err) {
      if (err) {
        return next(err);
      }
      return res.send("logged Out");
    });
} else {
   res.send("You are not logged in, So I cant logged you out")
}
    
  });

  module.exports = router