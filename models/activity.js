const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const activityTypes = [
  "BAKE",
  "DRAW",
  "EAT",
  "EXERCISE",
  "LISTEN",
  "MAKE",
  "MEET",
  "PLAY",
  "READ",
  "STUDY",
  "VISIT",
  "WATCH",
  "WRITE",
];

const activitySchema = new Schema({
  userID: Schema.Types.ObjectId,
  activityType: {
    type: String,
    uppercase: true,
    enum: activityTypes,
    required: true,
  },
  activityName: String,
  pings: Number,
  createdAt: Date,
});

module.exports = mongoose.model("Activity", activitySchema, "activities");
