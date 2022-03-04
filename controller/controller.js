const mongoose = require("mongoose");
const User = require("../models/user");

const signIn = (req, res) => {
//   const user = new User();
//   user.name = req.body.name;
//   user.email = req.body.email;
//   user.password = req.body.password;
//   user.save((err, data) => {
//     if (err) {
//       return res.status(400).send("you've made a mistake");
//     }
//     res.status(200).send("tester");
//   });
};

const signUp = (req, res) => {};

module.exports = { signIn, signUp };
