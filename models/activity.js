const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const activityTypes = ["PLAY", "WATCH", "LISTEN", "EAT", "MAKE", "READ", "VISIT", "MEET", "STUDY", "WRITE", "DRAW", "BAKE", "EXERCISE"];

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
