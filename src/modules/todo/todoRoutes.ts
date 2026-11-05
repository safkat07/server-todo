import express from "express";
import { todoController } from "./todoController";

const router = express.Router();
router.post("/", todoController.createTodo);

export const todoRoutes = router;
