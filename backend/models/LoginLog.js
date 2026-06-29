const mongoose = require("mongoose");

const loginLogSchema = new mongoose.Schema(
  {
    username: String,
    action: String, // "login" or "signup"
    time: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("LoginLog", loginLogSchema);