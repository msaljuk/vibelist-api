const unless = require("express-unless");
const passport = require("passport");
const passportJWT = require("passport-jwt");

passport.use(
  new passportJWT.Strategy(
    {
      jwtFromRequest: (req) => req.cookies.jwt,
      secretOrKey: process.env.JWT_SECRET,
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
  failureRedirect: "/api/v1/error/401",
});
authenticateJWT.unless = unless;

module.exports = authenticateJWT;
