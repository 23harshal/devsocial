const mongoose = require("mongoose");
const { trim } = require("validator");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 50,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 50,
      trim: true,
    },
    emailId: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      enum: {
        values: ["male", "female", "other"],
        message: `{VALUE} is not a valid gender type`,
      },
    },
    photoUrl: {
      type: String,
      default:
        "data:image/jpeg;base64,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",
    },
    about: {
      type: String,
      default: "i am new to this try someething new....",
    },
    hobbies: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
