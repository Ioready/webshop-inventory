import jwt from "jsonwebtoken";

export const auth = {
  genrateToken: (id) => {
    const token = jwt.sign({ id: id }, process.env.AUTH_SECRET, {
      expiresIn: "2min",
    });
    return token;
  },
  
  verifyToken: async (req, res, next) => {
    let token = req.headers.authorization;
    try {
      if (!token || !token.startsWith("Bearer "))
        return res
          .status(404)
          .json({ message: "Authentication failed: Please Login..." });
      token = token.split(" ")[1];
      const verified = jwt.verify(token, process.env.AUTH_SECRET);
      req.user = { userId: verified.id };
      next();
    } catch (error) {
      console.log(error);
      return res
        .status(401)
        .json({ message: "Authentication failed: invalid Login..." });
    }
  },

}
