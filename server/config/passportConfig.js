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

  passport.serializeUser((user, done) => {
    console.log("user at serial: ", user.id);
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      // const {id, email, access, first_name} = await User.findById(_id);
      const { email, access, first_name } = await User.findById(id);
      // const {id, email, access, first_name} = user
      const user = {
        id,
        first_name,
        email,
        access,
      };
      console.log("newUser: ", user);
      return done(null, user);
    } catch (err) {
      done(err);
    }
  });
};
