const express = require("express");
const router = express.Router();

const { signup, signin, updatefav } = require("../controller/auth");

router.post("/signup", signup);

router.post("/signin", signin);

router.patch("/updatefav", updatefav)

module.exports = router;
