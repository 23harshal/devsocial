const express = require("express");

const userRouter = express.Router();

const ConnectionRequest = require("../models/connectionRequest");
const userAuth = require("../middelwares/auth");
const User = require("../models/user");
const USER_PUBLIC_DATA = ["firstName", "lastName", "age", "about", "photoUrl"];
userRouter.get("/user/request/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequests = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", USER_PUBLIC_DATA);
    if (connectionRequests.length === 0) {
      return res
        .status(404)
        .json({ message: "there are no requests for you right now" });
    }

    res.json({
      message: "connection requests",
      connectionRequests,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequest = await ConnectionRequest.find({
      $or: [
        { toUserId: loggedInUser._id, status: "accepted" },
        { fromUserId: loggedInUser._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", USER_PUBLIC_DATA)
      .populate("toUserId", USER_PUBLIC_DATA);

    const data = connectionRequest.map((row) => {
      if (row.fromUserId.equals(loggedInUser._id)) {
        return row.toUserId;
      }
      return row.fromUserId;
    });

    res.json({
      message: "connected users",
      data,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

userRouter.get("/user/feed", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;

    if (limit > 30) {
      limit = 30;
    }
    console.log(limit);

    const skipPeople = (page - 1) * limit;

    const connectionRequest = await ConnectionRequest.find({
      $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
    });

    const hideUsersFromFeed = new Set();

    connectionRequest.forEach((request) => {
      hideUsersFromFeed.add(request.fromUserId.toString());
      hideUsersFromFeed.add(request.toUserId.toString());
    });

    const users = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideUsersFromFeed) } },
        { _id: { $ne: loggedInUser._id } },
      ],
    })
      .select(USER_PUBLIC_DATA)
      .skip(skipPeople)
      .limit(limit);

    res.json({
      message: "user feed ",
      data: users,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

module.exports = userRouter;
