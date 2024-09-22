import jwt from "jsonwebtoken";

export const auth = {
  genrateToken: (id) => {
    const token = jwt.sign({ id: id }, process.env.AUTH_SECRET, {
      expiresIn: "1d",
    });
    return token;
  },
  
  verifyToken: async (req, res, next) => {
    let token = req.headers.authorization;
    console.log(token,"toke")
    try {
      if (!token || !token.startsWith("Bearer "))
        return res
          .status(404)
          .json({ message: "Authentication failed: Please Login..." });
      token = token.split(" ")[1];
      const verified = jwt.verify(token, process.env.AUTH_SECRET);
      console.log(verified,"ver")
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
