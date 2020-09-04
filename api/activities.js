const express = require("express");
const router = express.Router();

const Activity = require("../models/activity");

router.get("/", (req, res) => {
  Activity.find()
    .then((users) => res.json(users))
    .catch((err) => console.log(err));
});

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
