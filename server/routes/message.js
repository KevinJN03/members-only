const express = require("express");
const router = express.Router();
const Message = require("../model/Message")
const User = require("../model/User")
router.post("/", async(req, res, next) => {
    const {_id } = await User.findOne({
        first_name: "test"}, "_id");
    console.log(_id)

    const msg = {

        author: _id,
        title: req.body.title,
        text: req.body.text
    }
const message = await Message.create(msg);
res.send(message)
})

module.exports = router