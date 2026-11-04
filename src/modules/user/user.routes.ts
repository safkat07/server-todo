import express, { Request, Response } from "express";
import { userController } from "./user.controller";

const router = express.Router();

const { createUser, getUser, getUserID, updateUser, deleteUser } =
  userController;

router.post("/", createUser);
router.get("/", getUser);
router.get("/:id", getUserID);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export const userRoutes = router;
