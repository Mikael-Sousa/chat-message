const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
import type { User } from '../types/index';

const registerUser = async (user: User) => {
    const existingUser = await userModel.findByEmail(user.email);

    if (existingUser) {
        throw new Error("EMAIL_ALREADY_EXISTS");
    }

    const hashedPassword = await bcrypt.hash(user.password, 10)

    const newUser = await userModel.registerNewUser({
        username: user.username,
        email: user.email,
        password: hashedPassword
    });


    return newUser;
};

module.exports = {
    registerUser,
};
