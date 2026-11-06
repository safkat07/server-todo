import { Request, Response } from "express";
import { authServices } from "./auth.services";

const loginUser = async (req: Request, res: Response) => {
  try {
    const result = await authServices.loginUser(
      req.body.email,
      req.body.password,
    );
    if (result.success === false) {
      res.status(404).json({ success: false, message: result.message });
    } else {
      res
        .status(200)
        .json({ success: true, message: "Log in Success", data: result });
    }
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const authController = {
  loginUser,
};
