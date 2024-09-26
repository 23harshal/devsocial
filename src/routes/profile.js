const express = require("express");
const profileRouter = express.Router();

const userAuth = require("../middelwares/auth");

profileRouter.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;

    res.json({ message: "user profile", user });
  } catch (error) {
    res.status(400).json({ message: "unauthorized user" });
  }
});

module.exports = profileRouter;
