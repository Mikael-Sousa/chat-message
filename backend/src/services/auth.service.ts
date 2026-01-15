const authModel = require("../models/auth.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
import type { User } from '../types/index';

const registerUser = async (user: User) => {
    const existingUser = await authModel.findByEmail(user.email);

    if (existingUser) {
        throw new Error("EMAIL_ALREADY_EXISTS");
    }

    const hashedPassword = await bcrypt.hash(user.password, 10)

    const newUser = await authModel.registerNewUser({
        username: user.username,
        email: user.email,
        password: hashedPassword
    });


    return newUser;
};

const login = async (email: string, password: string) => {
    const user = await authModel.findByEmail(email);

    if (!user) {
        throw new Error("EMAIL_NOT_FOUND");
    }

    const passwordMatch = await bcrypt.compare(password, user.password_hash);

    if (!passwordMatch) {
        throw new Error("PASSWORD_INVALIDATE");
    }

    const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );

  return {
    token,
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
    },
  };
};


module.exports = {
    registerUser,
    login,
};
