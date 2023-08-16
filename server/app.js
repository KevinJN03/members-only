//Import Module
require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors")
const path = require("path");
const session = require("express-session");
const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy;
const userRouter = require("./routes/user");
const messageRouter = require("./routes/message");
const signUpRouter = require("./routes/signup");

const PORT = 3000;

main().catch((err) => console.log(err));

async function main() {
  const dbName = process.env.DBName;
  const connectDb = await mongoose.connect(process.env.MONGO_URI).dbName;
}

const app = express();
app.use(express.json());
app.use(cors({origin: true, credentials: true}))
// app.use(bodyParser.urlencoded({extended: true}));
app.get("/", (req, res, next) => {
  res.send("Hi, the express app is working");
});

app.use("/user", userRouter);
app.use("/message", messageRouter);
app.use("/signup", signUpRouter);
app.listen(PORT, () => console.log("app listenig at Port: ", PORT));

module.exports = app;
