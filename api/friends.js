const async = require("async");
const express = require("express");
const router = express.Router();

const User = require("../models/user");

// get user's friends by ID
router.get("/:userID", (req, res) => {
  const userID = req.params.userID;

  User.findOne({ _id: userID }, "friends")
    .then((user) => {
      const friendIDs = user.friends;
      const friends = [];

      async.each(
        friendIDs,
        (friendID, callback) => {
          User.find({ _id: friendID }, "name email")
            .then((friend) => {
              if (friend) {
                friends.push(friend);
              }
              callback();
            })
            .catch((err) => callback(err));
        },
        (err) => {
          if (err) return console.log(err);

          res.json(friends);
        }
      );
    })
    .catch((err) => console.log(err));
});

// send friend request
router.post("/sendRequest", (req, res) => {
  const userID = req.user.userID;
  const friendID = req.body.friendID;

  User.findOneAndUpdate(
    { _id: friendID },
    { $addToSet: { friendRequests: userID } }
  )
    .then(() =>
      res.status(200).json({
        message: "Successfully sent friend request",
      })
    )
    .catch((err) => {
      console.log(err);
      res.status(502).json({
        message: "Error while sending friend request",
      });
    });
});

// cancel friend request
router.post("/cancelRequest", (req, res) => {
  const userID = req.user.userID;
  const friendID = req.body.friendID;

  User.findOneAndUpdate(
    { _id: friendID },
    { $pullAll: { friendRequests: [userID] } }
  )
    .then(() =>
      res.status(200).json({
        message: "Successfully deleted friend request",
      })
    )
    .catch((err) => {
      console.log(err);
      res.status(502).json({
        message: "Error while deleting friend request",
      });
    });
});

// accept friend request
router.post("/acceptRequest", (req, res) => {
  const userID = req.user.userID;
  const friendID = req.body.friendID;

  const mutualAddition = async () => {
    try {
      await User.findOneAndUpdate(
        { _id: userID },
        {
          $addToSet: { friends: friendID },
          $pullAll: { friendRequests: [userID] },
        }
      )
        .then(() =>
          res.write(
            JSON.stringify({
              message: "Successfully added friend to user's profile",
            })
          )
        )
        .catch((err) => {
          console.log(err);
          res.status(502).json({
            message: "Error while adding friend to user's profile",
          });
        });

      await User.findOneAndUpdate(
        { _id: friendID },
        {
          $addToSet: { friends: userID },
        }
      )
        .then(() => {
          res.write(
            JSON.stringify({
              message: "Successfully added user to friend's profile",
            })
          );
        })
        .catch((err) => {
          console.log(err);
          res.status(502).json({
            message: "Error while adding user to friend's profile",
          });
        });

      res.status(200).end();
    } catch (err) {
      console.log(err);
    }
  };

  mutualAddition();
});

// delete friend
router.post("/deleteFriend", (req, res) => {
  const userID = req.user.userID;
  const friendID = req.body.friendID;

  const mutualDeletion = async () => {
    try {
      await User.findOneAndUpdate(
        { _id: userID },
        {
          $pullAll: { friends: [friendID] },
        }
      )
        .then(() =>
          res.write(
            JSON.stringify({
              message: "Successfully deleted friend from user's profile",
            })
          )
        )
        .catch((err) => {
          console.log(err);
          res.status(502).json({
            message: "Error while deleting friend from user's profile",
          });
        });

      await User.findOneAndUpdate(
        { _id: friendID },
        {
          $pullAll: { friends: [userID] },
        }
      )
        .then(() => {
          res.write(
            JSON.stringify({
              message: "Successfully deleted user from friend's profile",
            })
          );
        })
        .catch((err) => {
          console.log(err);
          res.status(502).json({
            message: "Error while deleting user from friend's profile",
          });
        });

      res.status(200).end();
    } catch (err) {
      console.log(err);
    }
  };

  mutualDeletion();
});

module.exports = router;
