const express = require("express");
const router = express.Router();
const Message = require("../model/Message");
const User = require("../model/User");
const Controller = require("../controller/messageController");
const passport = require("passport");

router.get("/", Controller.message_get);

router.post("/create", passport.authenticate("jwt", { session: false }), Controller.message_create);

router.get("/query", Controller.message_query )


module.exports = router;
