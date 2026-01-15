const jwt = require("jsonwebtoken");

const authMiddleware = (req: any, res: any, next: () => void) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "TOKEN_NOT_PROVIDED" });
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);

    req.user = {
      id: decoded.id,
    };

    next();
  } catch {
    return res.status(401).json({ message: "INVALID_OR_EXPIRED_TOKEN" });
  }
};

module.exports = authMiddleware;
