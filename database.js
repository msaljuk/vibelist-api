const mongoose = require("mongoose");
const connection = `mongodb+srv://${process.env.MONGODB_ACCESS_USER_NAME}:${process.env.MONGODB_ACCESS_PASSWORD}@test.tcfm8.mongodb.net/${process.env.MONGODB_DB_NAME}?retryWrites=true&w=majority`;

mongoose
  .connect(connection, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Database Connected Successfully"))
  .catch((err) => console.log(err));
