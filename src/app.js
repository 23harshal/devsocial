const express = require("express");
const app = express();
require("dotenv").config();
const connectDB = require("./utils/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const http = require("http");
// Allow specific origins for CORS
const corsOptions = {
  origin: "http://localhost:5173", // Frontend URL
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, // Allow cookies to be sent
};

app.use(cors(corsOptions)); //
// Use CORS middleware with options
app.options("*", cors(corsOptions)); // Handle preflight requests

app.use(express.json());
app.use(cookieParser());

// Routes and Database connection
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");
const initalizeSocket = require("./utils/socket");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

const server = http.createServer(app);
initalizeSocket(server);

connectDB()
  .then(() => {
    console.log("Database is connected...");
    server.listen(5000, () => {
      console.log("App is running on port 5000");
    });
  })
  .catch((error) => {
    console.log(error);
  });
