const express = require("express");
const router = express.Router();
// const User = require("../models/user");
// const bcrypt = require("bcrypt");

const { signup, signin, updatefav } = require("../controller/auth");

router.post("/signup", signup);
// router.post("/signup", async (req, res) => {
//   console.log(req.body);
//   try {
//     const newPassword = await bcrypt.hash(req.body.password, 10);
//     await User.create({
//       name: req.body.name,
//       email: req.body.email,
//       password: newPassword,
//     });
//     res.json({ status: "ok" });
//   } catch (err) {
//     res.json({ status: "error", error: "Duplicate email" });
//   }
// });

router.post("/signin", signin);

router.patch("/updatefav", updatefav)

module.exports = router;
