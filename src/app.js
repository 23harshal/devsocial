const express = require("express");
const app = express();
require("dotenv").config();
const connectDB = require("./utils/database");
const { validateSignUpData } = require("./utils/validation");
const User = require("./models/user");
const bcrypt = require("bcrypt");
const validator = require("validator");
const cookieParser = require("cookie-parser");

const userAuth = require("./middelwares/auth");

app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
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

app.post("/login", async (req, res) => {
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

app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;

    res.json({ message: "user profile", user });
  } catch (error) {
    res.status(400).json({ message: "unauthorized user" });
  }
});

connectDB()
  .then(() => {
    console.log("Database is connected...");
    app.listen(5000, () => {
      console.log("app is running on 5000 server");
    });
  })
  .catch((error) => {
    console.log(error);
  });
