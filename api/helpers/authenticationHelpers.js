const express = require("express");

module.exports = {
  checkIfUnauthorizedRequest(req, res) {
    if (req.session.userID === undefined) {
      res.status(400).send("Unauthorized Request");
      return true;
    }
    return false;
  },
};
