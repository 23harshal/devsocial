const express = require("express");
const userAuth = require("../middelwares/auth");
const User = require("../models/user");
const ConnectionRequest = require("../models/connectionRequest");

const requestRouter = express.Router();

requestRouter.post(
  "/request/send/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.requestId;
      const status = req.params.status;

      const allowedStatus = ["ignored", "interested"];
      if (!allowedStatus.includes(status)) {
        throw new Error("invalid status");
      }

      const toUser = await User.findById(toUserId);
      if (!toUser) {
        return res.status(404).json({ message: "user not found" });
      }

      const existingRequest = await ConnectionRequest.findOne({
        $or: [
          { fromUserId: fromUserId, toUserId: toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });
      if (existingRequest) {
        throw new Error("connection request already sent");
      }

      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });
      const data = await connectionRequest.save();
      if (!data) {
        throw new Error("connection request not sent internal server error");
      }
      res.json({
        message: "connection request sent successfully",
        data,
      });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
);

requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const userId = req.user._id;
      const requestId = req.params.requestId;
      const status = req.params.status;

      const allowedStatus = ["rejected", "accepted"];

      if (!allowedStatus.includes(status)) {
        throw new Error("invalid status");
      }

      const connectionRequest = await ConnectionRequest.findOne({
        _id: requestId,
        toUserId: userId,
        status: "interested",
      });
      if (!connectionRequest) {
        throw new Error("invalid request not found....");
      }

      connectionRequest.status = status;

      const data = await connectionRequest.save();

      if (!data) {
        throw new Error("connection request not sent internal server error");
      }

      res.json({
        message: "connection request status changed successfully",
        data,
      });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
);




module.exports = requestRouter;
