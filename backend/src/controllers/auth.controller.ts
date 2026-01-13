const authService = require("../services/auth.service");

const register = async (req: any, res: any) => {
  try {
    const newUser = await authService.registerUser(req.body);

    return res.status(201).json(newUser);

  } catch (err: any) {

    if (err.message === "EMAIL_ALREADY_EXISTS") {
      return res.status(409).json({ message: "Email already registered" });
    }

    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  register,
};
