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

const login = async (email: string, password: string) => {
    const user = await userModel.findByEmail(email);

    if (!user) {
        throw new Error("EMAIL_NOT_FOUND");
    }

    const passwordMatch = await bcrypt.compare(password, user.password_hash);

    if (!passwordMatch) {
        throw new Error("PASSWORD_INVALIDATE");
    }

    return {
        id: user.id,
        username: user.username
    };
};


module.exports = {
    registerUser,
    login,
};
