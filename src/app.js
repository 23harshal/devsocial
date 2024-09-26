const express = require("express");
const app = express();
require("dotenv").config();
const connectDB = require("./utils/database");
const { validateSignUpData } = require("./utils/validation");
const User = require("./models/user");
const bcrypt = require("bcrypt");

app.use(express.json());

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

connectDB()
  .then(() => {
    console.log("Database is conneted...");
    app.listen(5000, () => {
      console.log("app is running on 5000 server");
    });
  })
  .catch((error) => {
    console.log(error);
  });
