const bcrypt = require("bcrypt");
const passport = require("passport");
const passportLocal = require("passport-local");

const User = require("../models/user");
const user = require("../models/user");

const isPasswordValid = async (enteredPassword, user) => {
  const match = await bcrypt.compare(enteredPassword, user.password);

  return match;
};

passport.use(
  new passportLocal.Strategy(
    { usernameField: "email", passwordField: "password" },
    (username, password, done) => {
      try {
        User.findOne({ email: username }, async (err, user) => {
          if (err) {
            return done(err);
          }
          if (!user) {
            return done(null, false, { message: "Incorrect username." });
          }

          const passwordsMatch = await isPasswordValid(password, user);
          if (!passwordsMatch) {
            return done(null, false, { message: "Incorrect password." });
          }

          return done(null, user);
        });
      } catch (err) {
        return done(err);
      }
    }
  )
);

const authenticateUserLogin = passport.authenticate("local", {
  failureRedirect: "/api/v1/error/401",
  session: false,
});

module.exports = authenticateUserLogin;
