const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

const authenticateUserLogin = require("../middleware/authenticateUserLogin");

// login user
router.post("/login", authenticateUserLogin, (req, res) => {
  const user = req.user;

  // set jwt cookie for future request authentication
  const payload = {
    userID: user._id,
    expires: Date.now() + parseInt(process.env.JWT_TIMEOUT),
  };
  const accessToken = jwt.sign(JSON.stringify(payload), process.env.JWT_SECRET);

  res.cookie("jwt", accessToken);
  res.status(200).json({
    message: "User Successfully Logged in",
    payload: payload,
  });
});

// logout user
router.get("/logout", (req, res) => {
  try {
    res.clearCookie("jwt");

    res.status(200).json({
      message: "User Successfully Logged Out",
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Internal Server Error.",
    });
  }
});

module.exports = router;
