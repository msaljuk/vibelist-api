const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  friendRequests: [{ type: Schema.Types.ObjectId }],
  friends: [{ type: Schema.Types.ObjectId }],
});

module.exports = mongoose.model("User", userSchema, "users");
