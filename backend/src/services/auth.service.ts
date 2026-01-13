const userModel = require("../models/user.model");
import type { User } from '../types/index';

const registerUser = async (user: User) => {
  const existingUser = await userModel.findByEmail(user.email);

  if (existingUser) {
    throw new Error("EMAIL_ALREADY_EXISTS");
  }

  const newUser = await userModel.registerNewUser(user);

  return newUser;
};

module.exports = {
  registerUser,
};
