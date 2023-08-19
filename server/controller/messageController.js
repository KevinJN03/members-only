const Message = require("../model/Message");
const asyncHandler = require("express-async-handler");
const { body, validationResult, matchedData } = require("express-validator");

exports.message_create = [
  body("title")
  .isLength({min: 1})
  .trim()
  .escape(),
  body("text")
  .trim()
  .isLength({min: 1})
  .escape(),
  asyncHandler(async (req, res, next) => {
    const result = validationResult(req)
    
    if(!result.isEmpty){
        return res.status(400).send(result.errors)
    } 

    const {title, text} = matchedData(req)
    try {
if(req.isAuthenticated){

  console.log("req.user at create message: ", req.user)
        const msg = {
            author : req.user._id,
            title,
            text
        }

        await Message.create(msg)
        return res.status(200).send("Message Created")
    } else {
        return res.status(401).send("User unauthenticated")
    }

    } catch(err) {
        console.log(err)
        next(err);
    }


    

  }),
];


exports.message_get = asyncHandler(async(req, res, next)=>{
    
    const msg = await Message.find({})
    .populate({ path: "author beautifyDate", select: "first_name last_name" })
    .exec();
  res.send(msg );
})