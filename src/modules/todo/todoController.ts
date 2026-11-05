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

const getAllTodo = async (req: Request, res: Response) => {
  try {
    const result = await todoServices.getAllTodo();
    res.status(200).json({
      success: true,
      message: "ALL Todo Retrived Successfully",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      details: error,
    });
  }
};

const deleteTodo = async (req: Request, res: Response) => {
  // console.log(req.params.id)
  try {
    const result = await todoServices.deleteTodo(req.params.id as string);

    if (result.rows.length > 0) {
      res.status(200).json({
        success: true,
        message: "ToDo Deleted Successfully",
        data: result.rows[0],
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Todo not found",
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Could Not find Data",
      details: error,
    });
  }
};

const getTodoById = async (req: Request, res: Response) => {
  try {
    const result = await todoServices.getTodoById(req.params.id as string);
    if (result.rows.length > 0) {
      res.status(200).json({
        success: true,
        message: `${req.params.id} no todo got from db`,
        data: result.rows[0],
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Todo not found",
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: true,
      message: error.message,
      details: error,
    });
  }
};

const updateTodo = async (req: Request, res: Response) => {
  const { title, description } = req.body;
  try {
    const result = await todoServices.updateTodo(
      title,
      description,
      req.params.id as string,
    );

    if (result.rows.length > 0) {
      res.status(200).json({
        success: true,
        message: "Todo Updated Successfully",
        data: result.rows[0],
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Todo not found",
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
      details: err,
    });
  }
};

export const todoController = {
  createTodo,
  getAllTodo,
  deleteTodo,
  getTodoById,
  updateTodo,
};
