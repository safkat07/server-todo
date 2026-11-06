import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import config from "../config";

const auth = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }
    try {
      const decoded = jwt.verify(token, config.secret as string);
      console.log({decode: decoded});
      next();
    } catch (error) {
      return res.status(401).json({
        message: "Unauthorized: Invalid or expired token",
        error: (error as Error).message,
      });
    }
  };
};

export default auth;
