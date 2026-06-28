const express = require("express");
const router = express.Router();

const {
  loginUser,
  signupUser,
  getLoginStats,
} = require("../controllers/authController");

router.post("/login", loginUser);
router.post("/signup", signupUser);
router.get("/stats", getLoginStats);

module.exports = router;