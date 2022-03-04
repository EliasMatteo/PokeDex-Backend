const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
      default: "name",
    },
    emai: {
      type: String,
      require: true,
      default: "email",
    },
    password: {
      type: String,
      require: true,
      default: "pass",
    },
  },
  {
    timeseries: true,
    Collection: "users",
  }
);
module.exports = mongoose.model("user", userSchema);
