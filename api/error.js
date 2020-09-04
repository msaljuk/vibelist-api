const express = require("express");
const router = express.Router();

const errorCodeToMessage = (errorCode) => {
  switch (errorCode) {
    case 401:
      return "Authorization failed. Your JWT Token is likely expired or invalid.";
    default:
      return "An unknown error occurred. Please try again later.";
  }
};

// send informative error code to user
router.get("/:errorCode", (req, res) => {
  const errorCode = parseInt(req.params.errorCode);

  res.status(errorCode).json({ message: errorCodeToMessage(errorCode) });
});

module.exports = router;
