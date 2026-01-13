import type { User } from '../types/index';

const register = (req: any, res: any, next: () => void) => {
    const user: User = req.body;

    if (!req.body || typeof req.body !== "object") {
        return res.status(400).json({
            message: "Request body must be a JSON object",
        });
    }

    if (!user.username || !user.email || !user.password) {
        return res.status(400).json({
            message: "username, email and password are required",
        });
    }

    if (user.username.length < 3) {
        return res.status(400).json({
            message: "username must be at least 3 characters long",
        });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(user.email)) {
        return res.status(400).json({
            message: "Invalid email format",
        });
    }

    if (user.password.length < 6) {
        return res.status(400).json({
            message: "Password must be at least 6 characters long",
        });
    }

    next();
};

module.exports = register;
