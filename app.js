//Base important imports
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

//File imports
const config = require("./config");
const appRouter = require("./routes/routes");

//Port specfication
// const port = 5000;

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

app.get("/", (req, res) => {
  res.status(200).json({ phrase: "hello PokeDex Test!" });
  res.status(503).send(console.log("why isnt this working"));
});

// app.post("/pokePost", (req, res) => {
//   let body = req.body;
//   res.send(req.body.value);
// });

// DB connections and ports
app.listen(process.env.PORT || 5000, () => {
  console.log("work please");
});

mongoose.connect(config.MONGODB_URL, () => {
  console.log("MongoDB connected");
});
