const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const config = require("./config");
//import routes
const authRoutes = require("./routes/authRoutes");
const { db } = require("./models/User");
//app
const app = express();

//Port specfication
// const port = 5000;

//middlewares
app.use(bodyParser.json());
app.use(cors());
//routes middleware
app.use(authRoutes);
/*--------------------*/
//App code

app.use(express.static(__dirname + "/public"));

// DB connections and ports
const PORT = process.env.PORT || 5000;

app.listen(process.env.PORT || 5000, () => {
  console.log("work please");
});

mongoose.connect(config.MONGODB_URL, () => {
  console.log("MongoDB connected");
});
