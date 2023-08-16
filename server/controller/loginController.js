const User = require("../model/User");
const {body, validationResult} = require("express-validator")
const asyncHandler = require("express-async-handler");


export const login_post = [
    body("email", "Not a valid Email").trim().escape().isEmail(). custom(async(email) => {
        const user = User.findOne({email: email});

        if(!user){
            throw new Error("User is not Registered");
        }
    }),
    asyncHandler(async (req, res, next) => {
        const result = validationResult(req);
        console.log("result: ", result)
        if(!result.isEmpty) {
            res.status(400).send(result.errors)
        }
    })
]