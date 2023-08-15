const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    author: {type: Schema.Types.ObjectId, ref: "User"},
    title: {type: String, required: true},
    timeStamp: {type: Date, default: Date.now},
    text : {type: String, required: true},

})

module.exports = mongoose.model("Message", MessageSchema)