const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      throw new Error("Not authenticated");
    }

    const decodedId = await jwt.verify(token, process.env.SECRET);
    const { _id } = decodedId;

    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User Not found");
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

module.exports = userAuth;
