const express = require("express");
const authRouter = express.Router();
const { validateSignUpData } = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");

authRouter.post("/signup", async (req, res) => {
  try {
    validateSignUpData(req);
    const { firstName, lastName, emailId, password } = req.body;

    const hashPassword = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: hashPassword,
    });

    const data = await user.save();
    if (data) {
      res.status(201).json({ message: "user created successfully" });
    } else {
      throw new Error("user not created internal server error");
    }
  } catch (error) {
    return res.status(400).send(error.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    if (!validator.isEmail(emailId)) {
      throw new Error("invalid credentials");
    }
    const user = await User.findOne({ emailId });
    if (!user) {
      throw new Error("user not found...");
    }

    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
      throw new Error("invalid credentials");
    }
    const token = await user.getJWT();

    res.cookie("token", token, {
      expires: new Date(Date.now() + 8 * 360000),
    });

    res.json({ message: "login successful" });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

authRouter.post("/logout", async (req, res) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
    });
    res.json({ message: "logout successful" });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = authRouter;
