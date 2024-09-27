const validator = require("validator");
const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName || !lastName || !emailId || !password) {
    throw new Error("All fields are mandatory");
  }

  if (!validator.isEmail(emailId)) {
    throw new Error("Email is invalid");
  }

  if (!validator.isStrongPassword(password)) {
    throw new Error("Password is not strong enough");
  }
};

const validateProfileData = (req) => {
  const allowedFields = [
    "firstName",
    "lastName",
    "gender",
    "photoUrl",
    "about",
    "hobbies",
    "age",
  ];

  const isallowed = Object.keys(req.body).every((field) =>
    allowedFields.includes(field)
  );
  return isallowed;
};

module.exports = {
  validateSignUpData,
  validateProfileData,
};
