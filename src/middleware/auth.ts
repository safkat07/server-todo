import jwt, { JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import config from "../config";

//roles =["admin", "user"]
const auth = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }
    try {
      const decoded = jwt.verify(token, config.secret as string);
      console.log({ decode: decoded });
      req.user = decoded as JwtPayload;

      if (roles.length && !roles.includes(req.user.role)) {
        return res
          .status(403)
          .json({ message: "Forbidden: Insufficient role" });
      }

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
