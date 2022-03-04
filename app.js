//Base important imports
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

//File imports
const config = require("./config");
const appRouter = require("./routes/routes");

//Port specfication
const port = 3000;

/*--------------------*/
//App code

app.use(cors());
app.use(appRouter);
app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/pokeGet", (req, res) => {
  res.status(200).json({ phrase: "hello PokeDex Test!" });
});

app.post("/pokePost", (req, res) => {
  let body = req.body;
  res.send(req.body.value);
});

// DB connections and ports
app.listen(port, () => {
  console.log(`Testing to see that app is listening on port ${port}`);
});

mongoose.connect(config.MONGODB_URL, () => {
  console.log("MongoDB connected");
});
