const mongoose = require("mongoose");
const connection =
  "mongodb+srv://test_user:EFLpLWWNYAyy7zlI@test.tcfm8.mongodb.net/Vibelist?retryWrites=true&w=majority";

mongoose
  .connect(connection, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Database Connected Successfully"))
  .catch((err) => console.log(err));
