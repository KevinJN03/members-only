//Import Module
require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const path = require("path");
const morgan = require("morgan");
var session = require("express-session");
var passport = require("passport");
const userRouter = require("./routes/user");
const messageRouter = require("./routes/message");
const signUpRouter = require("./routes/signup");
const loginRouter = require("./routes/login");
const indexRouter = require("./routes/index");
const logoutRouter = require("./routes/logout");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const PORT = 3000;
const secret = process.env.SECRET;
main().catch((err) => console.log(err));

async function main() {
  const dbName = process.env.DBName;
  const connectDb = await mongoose.connect(process.env.MONGO_URI).dbName;
}

const app = express();
app.use(morgan("dev"));
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser(secret));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: secret,
    resave: true,
    saveUninitialized: true,
    cookie: {
      secure: false, // Set to 'true' if using HTTPS
      
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());
// app.use(function (req, res, next) {
//   req.currentUser = req.user;
//   next();
// });
app.use("/", indexRouter);
app.use("/login", loginRouter);
app.use("/logout", logoutRouter);
app.use("/user", userRouter);
app.use("/message", messageRouter);
app.use("/signup", signUpRouter);
app.use((err, req, res, next) => {
  if (err) {
    console.error("Here is the Error Stack: " + err.stack);
    res.status(500).send("Error! Something has Broken");
  }
});

app.listen(PORT, () => console.log("app listenig at Port: ", PORT));

module.exports = app;
