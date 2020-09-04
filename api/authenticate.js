const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

const User = require("../models/user");

// login user
router.get("/login", (req, res) => {
  const email = req.query.email;

  User.findOne({ email: email }, (err, foundUser) => {
    if (err) res.status(401).send("User not found");
    else {
      const payload = {
        userID: foundUser._id,
        expires: Date.now() + parseInt(process.env.JWT_TIMEOUT),
      };
      const accessToken = jwt.sign(
        JSON.stringify(payload),
        process.env.JWT_SECRET
      );

      res.cookie("jwt", accessToken);
      res.status(200).json({
        message: "User Successfully Logged in",
        payload: payload,
      });
    }
  });
});

module.exports = router;
