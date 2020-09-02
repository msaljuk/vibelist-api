const express = require("express");
const router = express.Router();

const User = require("../models/user");

router.get("/old", (req, res) => {
  const email = req.query.email;

  User.findOne({ email: email }, (err, foundUser) => {
    if (err) res.status(401).send("User not found");
    else {
      req.session.userID = foundUser._id;
      res.send(`Found user with ID ${foundUser._id}`);
    }
  });
});

module.exports = router;
