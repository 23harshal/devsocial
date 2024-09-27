const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    status: {
      type: String,
      enum: {
        values: ["ignored", "interested", "accepted", "rejected"],
        message: `{VALUE} is incorrect status type`,
      },
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

requestSchema.pre("save", function () {
  const connectionRequest = this;
  //check fromuserid is same as to user id
  if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
    throw new Error("you can not send request to your self");
  }
});

const ConnectionRequest = mongoose.model("ConnectionRequest", requestSchema);

module.exports = ConnectionRequest;
