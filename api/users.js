const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();

const User = require("../models/user");

// get all users on app
router.get("/", (req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => console.log(err));
});

// create new user
router.post("/", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    bcrypt.hash(
      password,
      parseInt(process.env.PWD_SALT_ROUNDS),
      (err, hash) => {
        if (err) return null;

        const newUser = new User({
          name: name,
          email: email,
          password: hash,
          friends: [],
        });
        newUser
          .save()
          .then(() =>
            res.json({
              message: "Created account successfully",
            })
          )
          .catch((err) =>
            res.status(500).json({
              error: err,
              message: "Error creating account",
            })
          );
      }
    );
  } catch (err) {
    console.log(err);

    res.status(500).json({
      error: err,
      message: "Error during sign up process",
    });
  }
});

module.exports = router;
