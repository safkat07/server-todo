import { Request, Response } from "express";
import { todoServices } from "./todoServices";

const createTodo = async (req: Request, res: Response) => {
  const { user_id, title, description } = req.body;
  try {
    const result = await todoServices.createTodo(user_id, title, description);
    res.status(201).json({
      success: true,
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const todoController = {
  createTodo,
};
