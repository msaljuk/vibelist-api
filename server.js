const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const session = require("express-session");

const app = express();

// connect to MongoDB database
require("./database");

// Express middleware
app.use(bodyParser.json());
app.use(cors());
app.use(
  session({
    secret: "endur3AndSurviv32020",
    resave: false,
    saveUninitialized: false,
  })
);

// APIs
const authenticate = require("./api/authenticate");
app.use("/api/v1/authenticate", authenticate);

const users = require("./api/users");
app.use("/api/v1/users", users);

const activities = require("./api/activities");
app.use("/api/v1/activities", activities);

// Setting Port and Listening
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
