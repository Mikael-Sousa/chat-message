const authService = require("../services/auth.service");

const register = async (req: any, res: any) => {
  try {
    const result = await authService.registerUser(req.body);
    return res.status(result.status).json(result);

  } catch (err: any) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const login = async (req: any, res: any) => {
  try {
    const { email, password } = req.body;

    const result = await authService.login(email, password);
    return res.status(result.status).json(result);

  } catch (err: any) {
    return res.status(500).json({ message: "Internal server error" });

  }
};


module.exports = {
  register,
  login,
};
