const express = require("express");
const router = express.Router();
// const User = require("../models/user");
// const bcrypt = require("bcrypt");

const { signup, signin } = require("../controller/auth");

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

// router.post("/signin", async (req, res) => {
//   const user = await User.findOne({
//     email: req.body.email,
//   });

//   if (!user) {
//     return { status: "error", error: "Invalid login" };
//   }

//   const isPasswordValid = await bcrypt.compare(
//     req.body.password,
//     user.password
//   );

//   if (isPasswordValid) {
//     const token = jwt.sign(
//       {
//         name: user.name,
//         email: user.email,
//       },
//       access_token,
//       process.env.TOKEN_SECRET
//     );

//     return res.json({ status: "ok", user: token });
//   } else {
//     return res.json({ status: "error", user: false });
//   }
// });

module.exports = router;
