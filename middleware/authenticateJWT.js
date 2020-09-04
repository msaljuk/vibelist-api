const unless = require("express-unless");
const passport = require("passport");
const passportJWT = require("passport-jwt");

const secret = "endur3AndSurviv3JWT2020";

passport.use(
  new passportJWT.Strategy(
    {
      jwtFromRequest: (req) => req.cookies.jwt,
      secretOrKey: secret,
    },
    (jwtPayload, done) => {
      if (Date.now() > jwtPayload.expires) {
        return done(null, false, { message: "JWT has expired." });
      }

      return done(null, jwtPayload);
    }
  )
);

const authenticateJWT = passport.authenticate("jwt", {
  session: false,
  failureRedirect: "/login",
});
authenticateJWT.unless = unless;

module.exports = authenticateJWT;
