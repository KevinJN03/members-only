const mongoose =require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    first_name :  {type: String, required: true},
    last_name :  {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true, min : [6, "Password must be 6 or more characters"]},
    access: {type: Boolean, default: false}
})

UserSchema.virtual("fullname").get(function(){
return `${this.first_name} ${this.last_name}`
})

module.exports = mongoose.model("User", UserSchema);