//imports files
import User from "../models/user.js";

export const user = {
  // user Login
  userLogin: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email }).select("+password");
      if (user) {
        const isMatch = await user.comparePassword(password);
        if (isMatch) {
          if (user.isEmailVerified) {
            user.password = undefined;
            const token = await user.creatJwt();
            res.status(200).send({
              success: true,
              message: "Login Success",
              email: user.email,
              id: user._id,
              image: user.image,
              isEmailVerified: user.isEmailVerified,
              name: user.name,
              role: user.role,
              token,
            });
          } else {
            res.status(403).send({
              success: false,
              message: "Email not verified",
            });
          }
        } else {
          res.status(403).send({
            success: false,
            message: "Invalid Password",
          });
        }
      } else {
        res.status(403).send({
          success: false,
          message: "Invalid Email",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error Login",
        error,
      });
    }
  },
};
