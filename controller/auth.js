const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { createJWT } = require("../utils/authUtils");

const emailRegexp =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

exports.signup = async (req, res) => {
  let { name, email, password, password_confirmation, favourites } = req.body;
  let errors = [];
  if (!name) {
    errors.push({ name: "required" });
  }
  if (!email) {
    errors.push({ email: "required" });
  }
  if (!emailRegexp.test(email)) {
    errors.push({ email: "invalid" });
  }
  if (!password) {
    errors.push({ password: "required" });
  }
  if (!password_confirmation) {
    errors.push({
      password_confirmation: "required",
    });
  }
  if (password != password_confirmation) {
    errors.push({ password: "mismatch" });
  }
  if (errors.length > 0) {
    return res.status(422).json({ errors: errors });
  }
  console.log(req.body);
  User.findOne({ email: email }).then(async (user) => {
    if (user) {
      return res
        .status(422)
        .json({ errors: [{ user: "email already exists" }] });
    } else {
      const newPassword = await bcrypt.hash(req.body.password, 10);
      await User.create({
        name: req.body.name,
        email: req.body.email,
        password: newPassword,
        favourites: req.body.favourites,
      }).then((response) => {
        res.status(200).json({
          success: true,
          result: response,
        });
      });
    }
  });
};
exports.signin = (req, res) => {
  let { email, password } = req.body;
  let errors = [];
  if (!email) {
    errors.push({ email: "required" });
  }
  if (!emailRegexp.test(email)) {
    errors.push({ email: "invalid email" });
  }
  if (!password) {
    errors.push({ password: "required" });
  }
  if (errors.length > 0) {
    return res.status(422).json({ errors: errors });
  }

  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          errors: [{ user: "not found" }],
        });
      } else {
        bcrypt
          .compare(password, user.password)
          .then((isMatch) => {
            if (!isMatch) {
              return res
                .status(400)
                .json({ errors: [{ password: "incorrect" }] });
            }
            let access_token = createJWT(user.email, user._id, 3600);
            jwt.verify(
              access_token,
              process.env.TOKEN_SECRET,
              (err, decoded) => {
                if (err) {
                  res.status(500).json({ errors: "token error" });
                }
                if (decoded) {
                  return res.status(200).json({
                    success: true,
                    token: access_token,
                    message: user,
                  });
                }
              }
            );
          })
          .catch((err) => {
            res.status(500).json({ errors: "something went wrong" });
          });
      }
    })
    .catch((err) => {
      res.status(500).json({ errors: "err 2" });
    });
};

// exports.updatefav = (req, res) => {
//   let { favourites } = req.body;
//   let errors = [];

//   user
//     .findByIdAndUpdate(req.body.id, req.body, (err, user) => {
//       if (err) return res.status(404).send("favourites not found")

//       res.json(updatedfav)
//     })

//   console.log(res)
// }

exports.updatefav = (req, res) => {
  let { favourites } = req.body;
  let errors = [];

  User
    .findById(req.body.id, (err, user) => {
      user.favourites = req.body.favourites

      user.save((err, updatedfav) => {
        if (err) return res.status(404).send("favourites not found")

        res.json(updatedfav)
      })
    })
}
