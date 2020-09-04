// load env variables
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const authenticateJWT = require("./middleware/authenticateJWT");

const app = express();

// connect to MongoDB database
require("./database");

// Express middleware
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use(
  authenticateJWT.unless({
    path: ["/api/v1/error/401", "/api/v1/authenticate/login"],
  })
);

// APIs
const activities = require("./api/activities");
app.use("/api/v1/activities", activities);

const authenticate = require("./api/authenticate");
app.use("/api/v1/authenticate", authenticate);

const error = require("./api/error");
app.use("/api/v1/error", error);

const friends = require("./api/friends");
app.use("/api/v1/friends", friends);

const users = require("./api/users");
app.use("/api/v1/users", users);

// Setting Port and Listening
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
