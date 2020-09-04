const express = require("express");
const router = express.Router();

const Activity = require("../models/activity");

// get all activities on app
router.get("/all", (req, res) => {
  Activity.find()
    .then((activities) => res.json(activities))
    .catch((err) => console.log(err));
});

// get all activities for given user
router.get("/:userID", (req, res) => {
  const userID = req.params.userID;
  const activityType = req.query.type;

  // if valid activity type given as param, return only those activities
  // otherwise, return all of user's activities
  if (
    activityType &&
    Activity.getActivityTypes().indexOf(activityType) !== -1
  ) {
    Activity.find({
      userID: userID,
      activityType: activityType,
    })
      .then((activities) => res.json(activities))
      .catch((err) => {
        console.log(err);
        res.status(400).json({
          message: "Bad Request",
        });
      });
  } else {
    Activity.find({ userID: userID })
      .then((activities) => res.json(activities))
      .catch((err) => {
        console.log(err);
        res.status(400).json({
          message: "Bad Request",
        });
      });
  }
});

// create activity
router.post("/", (req, res) => {
  const { activityName, activityType } = req.body;
  const newActivity = new Activity({
    userID: req.user.userID,
    activityName: activityName,
    activityType: activityType,
    pings: 0,
    createdAt: new Date(),
  });
  newActivity
    .save()
    .then(() =>
      res.json({
        message: "Created activity successfully",
      })
    )
    .catch((err) =>
      res.status(400).json({
        error: err,
        message: "Error creating activity",
      })
    );
});

module.exports = router;
