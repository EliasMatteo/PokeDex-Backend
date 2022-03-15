const express = require("express");
const app = express();
const port = 3000;

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.send("hello PokeDex Test!");
});

app.listen(port, () => {
  console.log(`Testing to see that app is listening on port ${port}`);
});
