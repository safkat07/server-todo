import express from "express";
import { todoController } from "./todoController";

const router = express.Router();
const { createTodo, getAllTodo, deleteTodo, getTodoById, updateTodo } =
  todoController;
router.post("/", createTodo);
router.get("/", getAllTodo);
router.get("/:id", getTodoById);
router.patch("/:id", updateTodo);
router.delete("/:id", deleteTodo);

export const todoRoutes = router;
