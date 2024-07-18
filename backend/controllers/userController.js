//imports files
import { genPass } from "../config/bcript.js";
import User from "../models/user.js";
import webshopUser from "../models/webshopUser.js";

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
  webshopRegister : async(req,res)=>{
    try{
        const {title,firstName,lastName,email,password,offers,privacy,newsletter} = req.body;
        const newPassword = await genPass.password(password)
        const exists = await webshopUser.find({email})
        if(exists.length>0){
            res.status(400).send({message:"emailId already exists"})
        }else{
                const user = await webshopUser.create({firstName,lastName,title,email,password:newPassword,offers,privacy,newsletter})
                await user.save()
                res.status(200).send(user)  
        }
    }catch(err){
        res.send(err)
    }
},
  webshopLogin: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await webshopUser.findOne({ email }).select("+password");
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
              lastName: user.lastName,
              isEmailVerified: user.isEmailVerified,
              firstName: user.firstName,
              title: user.title,
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
