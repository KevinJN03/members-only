const express = require("express");
const router = express.Router()
const User = require("../model/User")

router.get("/", async (req, res, next) => {
  
    res.send("your at the user login page")
})

router.post("/", async (req, res, next) => {
    
    // console.log("body: ", req.body)
    const user = await User.create(req.body);
    res.send(req.body)
})



module.exports = router