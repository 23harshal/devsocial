const express = require("express");
const User = require("../models/user");

const userAuth = require("../middelwares/auth");
const { validateProfileData } = require("../utils/validation");

const profileRouter = express.Router();

profileRouter.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;

    res.json({ message: "user profile", user });
  } catch (error) {
    res.status(400).json({ message: "unauthorized user" });
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateProfileData(req)) {
      throw new Error("you are not allowed to edit...");
    }
    const user = req.user;

    Object.keys(req.body).forEach((key) => (user[key] = req.body[key]));

    await user.save();

    res.json({ message: user.firstName + "your profile is updated" });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = profileRouter;
