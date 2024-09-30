//imports files
import { genPass } from "../config/bcript.js";
import User from "../models/user.js";
import webshopUser from "../models/webshopUser.js";
import Order from "../models/order.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

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
  // webshopRegister: async (req, res) => {
  //   try {
  //     const { firstName, lastName, email, password, birthDate, title, type } =
  //       req.body;
  //     console.log(firstName, lastName, email, password, birthDate, type);
  //     const exists = await webshopUser.find({ email });
  //     if (exists.length > 0) {
  //       res.status(400).send({ message: "emailId already exists" });
  //     } else {
  //       const newPassword = await bcrypt.hash(password, 10);
  //       const user = await webshopUser.create({
  //         firstName,
  //         lastName,
  //         email,
  //         password: newPassword,
  //         birthDate,
  //         title,
  //         type,
  //       });
  //      const result =  await user.save();
  //      const token = await result.creatJwt();
  //       res.status(200).send({user,...token});
  //     }
  //   } catch (err) {
  //     res.send(err);
  //   }
  // },

  // webshopRegister: async (req, res) => {
  //   try {
  //     const { firstName, lastName, email, password, birthDate, title, type } = req.body;

  //     console.log(`Registering or updating user: ${firstName} ${lastName} (${email}, Type: ${type})`);

  //     // Check if a user with the same email already exists
  //     let existingUser = await webshopUser.findOne({ email });

  //     // If the user is a GuestUser and no password is provided, set password to blank
  //     let hashedPassword = "";
  //     if (type === "GuestUser") {
  //       hashedPassword = password || ""; // If no password is provided for GuestUser, keep it blank
  //     } else if (type === "webShopUser") {
  //       // For webShopUser, password must be provided
  //       if (!password) {
  //         return res.status(400).json({ message: "Password is required for webShopUser" });
  //       }
  //       hashedPassword = await bcrypt.hash(password, 10); // Hash the password for webShopUser
  //     }

  //     // If the user already exists, silently update their information (don't show an error)
  //     if (existingUser) {
  //       // Update the user's details
  //       existingUser.firstName = firstName;
  //       existingUser.lastName = lastName;
  //       existingUser.birthDate = birthDate;
  //       existingUser.title = title;
  //       if (type === "webShopUser") {
  //         existingUser.type = "webShopUser"; // Update to webShopUser if they were previously a GuestUser
  //       }
  //       if (hashedPassword) {
  //         existingUser.password = hashedPassword; // Update password if provided for webShopUser
  //       }

  //       // Save the updated user without any error response
  //       const updatedUser = await existingUser.save();
  //       const token = await updatedUser.createJwt();

  //       const response = {
  //         title: updatedUser.title,
  //         firstName: updatedUser.firstName,
  //         lastName: updatedUser.lastName,
  //         email: updatedUser.email,
  //         password: updatedUser.password,
  //         birthDate: updatedUser.birthDate.toISOString().split("T")[0],
  //         isEmailVerified: updatedUser.isEmailVerified,
  //         _id: updatedUser._id,
  //         createdAt: updatedUser.createdAt,
  //         updatedAt: updatedUser.updatedAt,
  //         __v: updatedUser.__v,
  //         token: token,
  //       };

  //       // Silently respond with the updated user data without throwing an error
  //       return res.status(200).json({ message: "User information updated", ...response });
  //     }

  //     // If no existing user, create a new one
  //     const user = new webshopUser({
  //       firstName,
  //       lastName,
  //       email,
  //       password: hashedPassword,
  //       birthDate,
  //       title,
  //       type,
  //     });

  //     const savedUser = await user.save();
  //     const token = await savedUser.createJwt();

  //     // Prepare response
  //     const response = {
  //       title: savedUser.title,
  //       firstName: savedUser.firstName,
  //       lastName: savedUser.lastName,
  //       email: savedUser.email,
  //       password: savedUser.password,
  //       birthDate: savedUser.birthDate.toISOString().split("T")[0],
  //       isEmailVerified: savedUser.isEmailVerified,
  //       _id: savedUser._id,
  //       createdAt: savedUser.createdAt,
  //       updatedAt: savedUser.updatedAt,
  //       __v: savedUser.__v,
  //       token: token,
  //     };

  //     // Send response
  //     return res.status(201).json(response);

  //   } catch (error) {
  //     console.error("Error registering or updating user:", error.message);
  //     return res.status(500).json({ message: "Server error, please try again later" });
  //   }
  // },

  webshopRegister: async (req, res) => {
    try {
      const { firstName, lastName, email, password, birthDate, title, type } =
        req.body;

      console.log(
        `Registering user: ${firstName} ${lastName} (${email}, Type: ${type})`
      );

      // Check if a user with the same email already exists
      let existingUser = await webshopUser.findOne({ email });

      // If the user is a GuestUser and no password is provided, set password to blank
      let hashedPassword = "";
      if (type === "GuestUser") {
        hashedPassword = await bcrypt.hash(password, 10) || ""; // If no password is provided for GuestUser, keep it blank
      } else if (type === "webShopUser") {
        // For webShopUser, password must be provided
        if (!password) {
          return res
            .status(400)
            .json({ message: "Password is required for webShopUser" });
        }
        hashedPassword = await bcrypt.hash(password, 10); // Hash the password for webShopUser
      }

      // If the user exists and is currently a GuestUser, allow upgrade to webShopUser
      if (existingUser) {
        if (existingUser.type === "GuestUser" && type === "webShopUser") {
          // Update the existing GuestUser to a webShopUser
          existingUser.firstName = firstName;
          existingUser.lastName = lastName;
          existingUser.birthDate = birthDate;
          existingUser.title = title;
          existingUser.type = "webShopUser";
          if (hashedPassword) {
            existingUser.password = hashedPassword; // Update password if provided
          }

          // Save the updated user
          const updatedUser = await existingUser.save();
          // const token = await updatedUser.createJwt();
          const token = jwt.sign(
            { id: updatedUser._id}, // Payload
            process.env.AUTH_SECRET, // Secret key for signing
           
          );

          const response = {
            title: updatedUser.title,
            firstName: updatedUser.firstName,
            lastName: updatedUser.lastName,
            email: updatedUser.email,
            password: updatedUser.password,
            birthDate: updatedUser.birthDate,
            isEmailVerified: updatedUser.isEmailVerified,
            _id: updatedUser._id,
            createdAt: updatedUser.createdAt,
            updatedAt: updatedUser.updatedAt,
            type: updatedUser.type,
            __v: updatedUser.__v,
            token: token,
          };

          return res
            .status(200)
            .json({ message: "User upgraded to webShopUser", ...response });
        }
        else if(existingUser.type === "GuestUser" && type === "GuestUser") {
          // Update the existing GuestUser to a webShopUser
          existingUser.firstName = firstName;
          existingUser.lastName = lastName;
          existingUser.birthDate = birthDate;
          existingUser.title = title;
          if (hashedPassword) {
            existingUser.password = hashedPassword; // Update password if provided
          }

          // Save the updated user
          const updatedUser = await existingUser.save();
          // const token = await updatedUser.createJwt();
          const token = jwt.sign(
            { id: updatedUser._id}, // Payload
            process.env.AUTH_SECRET, // Secret key for signing
           
          );

          const response = {
            title: updatedUser.title,
            firstName: updatedUser.firstName,
            lastName: updatedUser.lastName,
            email: updatedUser.email,
            password: updatedUser.password,
            birthDate: updatedUser.birthDate,
            isEmailVerified: updatedUser.isEmailVerified,
            _id: updatedUser._id,
            createdAt: updatedUser.createdAt,
            updatedAt: updatedUser.updatedAt,
            type: updatedUser.type,
            __v: updatedUser.__v,
            token: token,
          };

          return res
            .status(200)
            .json({ message: "User upgraded to GuestUser", ...response });
        }


        // If user already exists as a webShopUser, don't allow duplicate registration
        return res
          .status(400)
          .json({
            message: "User with this email already registered as a webShopUser",
          });
      }

      // If no existing user, create a new one
      const user = new webshopUser({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        birthDate,
        title,
        type,
      });

      const savedUser = await user.save();
      // const token = await savedUser.createJwt();
     const token = jwt.sign(
        { id: savedUser._id}, // Payload
        process.env.AUTH_SECRET, // Secret key for signing
       
      );

      // Prepare response
      const response = {
        title: savedUser.title,
        firstName: savedUser.firstName,
        lastName: savedUser.lastName,
        email: savedUser.email,
        password: savedUser.password,
        birthDate: savedUser.birthDate,
        isEmailVerified: savedUser.isEmailVerified,
        _id: savedUser._id,
        createdAt: savedUser.createdAt,
        updatedAt: savedUser.updatedAt,
        type: savedUser.type,
        __v: savedUser.__v,
        token: token,
      };

      // Send response
      return res.status(201).json(response);
    } catch (error) {
      console.error("Error registering user:", error.message);
      return res
        .status(500)
        .json({ message: "Server error, please try again later" });
    }
  },

  webshopLogin: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await webshopUser.findOne({ email }).select("+password");
      if (user) {
        const isMatch = await bcrypt.compare(password,user.password)
        // const isMatch = true;
        if (isMatch) {
          if (user.isEmailVerified) {
            user.password = undefined;
            // const token = await user.creatJwt();
            const token = jwt.sign(
              { id: user._id}, // Payload
              process.env.AUTH_SECRET, // Secret key for signing
             
            );
            res.status(200).send({
              success: true,
              message: "Login Success",
              email: user.email,
              id: user._id,
              lastName: user.lastName,
              isEmailVerified: user.isEmailVerified,
              firstName: user.firstName,
              title: user.title,
              birthDate: user.birthDate,
              title: user.title,
              type:user.type,
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

  getWebShopUsers : async (req,res) => {
    try {
      // Fetch all users from the database
      let users = await webshopUser.find();
  
      if (!users || users.length === 0) {
        return res.status(404).json({ message: "No users found." });
      }
  
      // Fetch orders for each user and calculate the total orders and total amount spent
      let usersWithOrders = await Promise.all(
        users.map(async (user) => {
          // Find orders associated with this user
          const userOrders = await Order.find({ userId: user._id });
  
          // Calculate total orders and total amount spent
          const totalOrders = userOrders.length;
          const totalAmountSpent = userOrders.reduce((sum, order) => sum + order.totalOrderAmount, 0);
  
          return {
            ...user._doc, // Spread the user details
            orders: userOrders, // Include the user's orders
            totalOrders, // Total number of orders
            totalAmountSpent, // Total amount spent
          };
        })
      );
  
      // Send the response with users and their orders
      res.status(200).json(usersWithOrders);
    } catch (error) {
      console.error("Error fetching users and orders:", error);
      res.status(500).json({ message: "Failed to fetch users and orders." });
    }
  },

  getUserDetailsById : async (req,res) =>{
    try {
      const userId = req.params.id;
  
      // Fetch the user by ID
      const user = await webshopUser.findById(userId).lean();
  
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      // Fetch orders related to the user and populate the product details for each order item
      const orders = await Order.find({ userId })
        .populate({
          path: 'orderItems.productId', // Assuming `productId` is the reference field in orderItems
          select: '-description', // Exclude the `description` field
        })
        .lean();
  
      // Calculate total orders and total amount spent
      const totalOrders = orders.length;
      const totalAmountSpent = orders.reduce((acc, order) => acc + order.totalOrderAmount, 0);
  
      // Add orders, totalOrders, and totalAmountSpent to the user object
      const userWithOrders = {
        ...user,
        orders,
        totalOrders,
        totalAmountSpent,
      };
  
      // Return the user details with orders and populated product details
      res.status(200).json(userWithOrders);
    } catch (error) {
      console.error("Error fetching user details:", error);
      res.status(500).json({ error: "Failed to fetch user details" });
    }
  },
  deleteWebShopUsers: async (req, res) => {
    // const { orderId } = req.body;
    const idsArray = req.body.body._id;
    try {
      // Find and delete the order by its ID
      const deleteUser = await webshopUser.deleteMany({ _id: { $in: idsArray } });

      if (!deleteUser) {
        return res.status(404).json({ message: "user not found" });
      }

      // Send a success response
      res.status(200).json({
        message: "user deleted successfully",
        order: deleteUser,
      });
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({ message: "Error deleting user" });
    }
  },

};
