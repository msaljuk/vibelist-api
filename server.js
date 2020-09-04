const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const authenticateJWT = require("./middleware/authenticateJWT");

// load env variables
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const app = express();

// connect to MongoDB database
require("./database");

// Express middleware
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use(
  authenticateJWT.unless({ path: ["/login", "/api/v1/authenticate/login"] })
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
