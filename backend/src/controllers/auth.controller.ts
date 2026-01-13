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

const login = async (req: any, res: any) => {
  try {
    const { email, password } = req.body;

    const user = await authService.login(email, password);

    return res.status(200).json(user);

  } catch (err: any) {

    if (err.message === "EMAIL_NOT_FOUND" || err.message === "PASSWORD_INVALIDATE") {
      return res.status(409).json({ message: "Email or password invalidates" });
    }

    return res.status(500).json({ message: "Internal server error" });

  }
};


module.exports = {
  register,
  login,
};
