import bcrypt from "bcryptjs";
import { createError } from "./../utils/error.js";
import jwt from "jsonwebtoken";
import prisma from "./../utils/prisma.js";
export const login = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: req.body.email,
      },
    });
    if (!user) return next(createError(404, "User not found!"));

    const isPasswordCorrect = req.body.password === user.password ? true : false;
    if (!isPasswordCorrect) return next(createError(400, "Wrong password or username!"));

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT);
    const { password, ...userDetails } = user;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ authentication: "user authenticated successfully", userDetails });
  } catch (err) {
    next(err);
  }
};
export const logout = async (req, res, next) => {
  try {
    res.cookie("access_token", "", { maxAge: -100, httpOnly: true }).status(200).json({ authentication: "Logged out successfully" });
  } catch (err) {
    next(err);
  }
};
