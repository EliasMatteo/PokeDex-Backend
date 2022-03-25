const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
      default: "name",
    },
    email: {
      type: String,
      require: true,
      default: "email",
    },
    password: {
      type: String,
      require: true,
      default: "pass",
    },
    favourites: {
      type: [String],
      required: false,
    },
  },
  {
    timeseries: true,
    Collection: "users",
  }
);
module.exports = mongoose.model("User", userSchema);
