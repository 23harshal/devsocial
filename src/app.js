const express = require("express");
const app = express();
require("dotenv").config();
const connectDB = require("./utils/database");
const cookieParser = require("cookie-parser");
var cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

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
