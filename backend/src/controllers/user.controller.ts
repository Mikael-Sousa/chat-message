const userService = require("../services/user.service");

const getMe = async (req: any, res: any) => {
    try {
        const userId = req.user.id;

        const profile = await userService.getProfileByUserId(userId);

        return res.status(200).json(profile);

    } catch (err: any) {

        if (err.message === "USER_ID_REQUIRED") {
            return res.status(404).json({ message: "!userId" });
        }

        if (err.message === "PROFILE_NOT_FOUND") {
            return res.status(404).json({ message: "Profile not found" });
        }

        console.error("ERRO REAL:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const getUsers = async (req: any, res: any) => {
    try {
        const { username } = req.params;

        const profile = await userService.getProfileByUsername(username);

        return res.status(200).json(profile);

    } catch (err: any) {

        if (err.message === "USERNAME_REQUIRED") {
            return res.status(404).json({ message: "!username" });
        }

        if (err.message === "PROFILE_NOT_FOUND") {
            return res.status(404).json({ message: "Profile not found" });
        }

        console.error("ERRO REAL:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = {
    getMe,
    getUsers
};
