const LocalStrategy = require("passport-local").Strategy;
const User = require("../model/User");
const bcrypt = require("bcryptjs");

module.exports = function (passport) {
  passport.use(
    new LocalStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        try {
          const user = await User.findOne({ email: email });
          if (!user) {
            return done(null, false, { message: "Incorrect email." });
          }

          const match = bcrypt.compare(password, user.password);
          if (!match) {
            return done(null, false, { message: "Incorrect password." });
          } else if (match) {
            return done(null, user);
          }
        } catch (err) {
          return done(err);
        }
      }
    )
  );

  passport.serializeUser((user, cb) => {
    cb(null, user.id);
  });

  passport.deserializeUser(async (id, cb) => {
    try {
      const user = await User.findById(id);
      const {_id, email, access, first_name} = user
      const newUser = {
        _id,
        // fullname: user.fullname,
        first_name,
        access,
        email

      }
      cb(null, newUser);
    } catch (err) {
      cb(err);
    }
  });
};
