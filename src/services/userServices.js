const User = require("../models/User");

async function getUserByEmail(email) {
  return await User.findOne({ email });
}

async function createUser(name, email, password) {
  const newUser = new User({
    name,
    email,
    password: password,
  });

  await newUser.save();
  return newUser;
}

module.exports = {
  getUserByEmail,
  createUser,
};
