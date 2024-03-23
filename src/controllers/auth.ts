import { Express, Request, Response } from "express";
import userSchema from "../models/userSchema";
// const emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
import { generateToken } from "../utils/jwt";
// import { emailSenders } from '../utils/authUtils'
import bcrypt from "bcrypt";

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    if (name !== null && email !== null && password !== null) {
      const userExist: any = await userSchema.findOne({ email: email });
      if (!userExist) {
        if (email) {
          const bcryptPassword: String = await bcrypt.hash(password, 10);
          const newUser = new userSchema({
            name,
            email,
            password: bcryptPassword,
            date: new Date(),
            isVerified: false,
            access: true,
          });
          await newUser.save();
          const token = await generateToken(newUser.id);
          res.status(200).json({
            message: "User created successfully",
            userName: newUser.name,
            userId: newUser.id,
            accessToken: token,
          });
        } else {
          res.status(401).json({ message: "Invalid Email" });
        }
      } else {
        return res.status(401).json({ message: "User already exist" });
      }
    } else {
      return res.status(401).json({ message: "Please fill all fields" });
    }
  } catch (error) {
    return res.status(500).json({ message: "server error" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (email !== null && password !== null) {
      const user = await userSchema.findOne({ email: email });
      if (user) {
        if (user?.access) {
          if (await bcrypt.compare(password, user.password)) {
            const token = await generateToken(user.id);
            res
              .status(200)
              .json({
                message: "Login successful",
                userName: user.name,
                userId: user.id,
                accessToken: token,
              });
          } else {
            res.status(401).json({ message: "Invalid password" });
          }
        } else {
          res.status(401).json({ message: "Blocked This Account" });
        }
      } else {
        res.status(401).json({ message: "Invalid email" });
      }
    } else {
      res.status(401).json({ message: "Please fill all fields" });
    }
  } catch (error) {
    return res.status(500).json({ message: "server error" });
  }
};
