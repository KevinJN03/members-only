const express = require("express");
const router = express.Router();
const Message = require("../model/Message");
const User = require("../model/User");
const Controller = require("../controller/messageController");
router.get("/", Controller.message_get);

router.post("/create", Controller.message_create);

router.get("/query", async (req, res, next) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const [messages, count] = await Promise.all([
    Message.find()
      .populate({ path: "author", select: "first_name" })
      .limit(limit)
      .skip(startIndex),
    Message.countDocuments().exec(),
  ]);

  const results = {};
  results.count = Math.ceil(count / limit)
  results.message = messages;

  results.next = {
    page: page + 1,
    limit: limit,
  };

  if (startIndex > 0)
    results.previous = {
      page: page - 1,
    };

  if (endIndex < count)
    results.next = {
      page: page + 1,
    };

  return res.send({ page, limit, results });
});

// })
module.exports = router;
