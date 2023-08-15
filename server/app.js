//Import Module
require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
var bodyParser = require("body-parser");
const userRouter = require("./routes/user");
const messageRouter = require("./routes/message")
const PORT = 3000;

main().catch((err) => console.log(err));

async function main() {
  const dbName = "member-only"
  const connectDb = await mongoose.connect(process.env.MONGO_URI).dbName;
  
}

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.get("/", (req, res, next) => {
  res.send("Hi, the express app is working");
});

app.use("/user", userRouter);
app.use("/message", messageRouter)
app.listen(PORT, () =>
  console.log("app listenig at Port: ", PORT)
);

module.exports = app;
