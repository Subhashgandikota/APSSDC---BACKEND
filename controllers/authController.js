const LoginLog = require("../models/LoginLog");

// LOGIN
exports.loginUser = async (req, res) => {
  const { username } = req.body;

  try {
    await LoginLog.create({
      username,
      action: "login",
    });

    res.json({ message: "Login successful" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// SIGNUP
exports.signupUser = async (req, res) => {
  const { username } = req.body;

  try {
    await LoginLog.create({
      username,
      action: "signup",
    });

    res.json({ message: "Signup successful" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// STATS
exports.getLoginStats = async (req, res) => {
  try {
    const totalLogins = await LoginLog.countDocuments({ action: "login" });
    const totalSignups = await LoginLog.countDocuments({ action: "signup" });

    res.json({
      logins: totalLogins,
      signups: totalSignups,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};