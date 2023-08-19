const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    author: {type: Schema.Types.ObjectId, ref: "User"},
    title: {type: String, required: true},
    timeStamp: {type: Date, default: Date.now},
    text : {type: String, required: true},

},{toJSON: {virtuals: true}})

MessageSchema.virtual("fullName").get(function(){
return `${this.author.first_name} ${this.author.last_name}`
})

MessageSchema.virtual("beautifyDate", {localField: "date", foreignField: "dateId" }).get(function(){
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return this.timeStamp.toLocaleDateString("en-US", options);
 
    })

module.exports = mongoose.model("Message", MessageSchema)