const userService = require("../services/user.service");

const getMe = async (req: any, res: any) => {
    try {
        const userId = req.user.id;
        const result = await userService.getProfileByUserId(userId);
        return res.status(result.status).json(result)

    } catch (err: any) {
        return res.status(500).json({ message: "Internal server error" });
    }
};

const getUsers = async (req: any, res: any) => {
    try {
        const { username } = req.params;

        const result = await userService.getProfileByUsername(username);
        return res.status(result.status).json(result);

    } catch (err: any) {
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = {
    getMe,
    getUsers
};
