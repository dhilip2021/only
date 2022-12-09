const express = require("express");
const { signup, signin, signout } = require("../../controller/admin/authController");

const router = express.Router();

router.post("/admin/signup",signup);
router.post("/admin/signin",signin);
router.post("/admin/signout",signout);

module.exports = router;