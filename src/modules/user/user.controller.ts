import { Request, Response } from "express";
import { pool } from "../../config/db";
import { userServices } from "./userServices";

const createUser = async (req: Request, res: Response) => {
  // console.log(req.body)
  const { name, email, age, password, role } = req.body;
  //query to send info in DB
  try {
    const result = await userServices.createUsers(req.body);
    // console.log(result.rows[0]);
    res.status(201).json({
      success: true,
      message: "Data Inserted Successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getUser = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getAllUser();
    res.status(200).json({
      success: true,
      message: "Users Retried Sucessfully",
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

const getUserID = async (req: Request, res: Response) => {
  // console.log(req.params.id)
  try {
    const result = await userServices.getUserById(req.params.id as string);
    if (result.rows.length > 0) {
      res.status(200).json({
        success: true,
        message: "User Found",
        data: result.rows[0],
      });
    } else {
      res.status(404).json({
        success: false,
        message: "user not found",
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      details: error,
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  const { name, email, age } = req.body;
  try {
    const result = await userServices.updateUser(
      name,
      email,
      age,
      req.params.id as string,
    );

    if (result.rows.length > 0) {
      res.status(200).json({
        success: true,
        message: "User Updated Successfully",
        data: result.rows[0],
      });
    } else {
      res.status(404).json({
        success: false,
        message: "user not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in update route",
      details: error,
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const result = await userServices.deleteUser(req.params.id as string);
    if (result.rows.length > 0) {
      res.status(200).json({
        success: true,
        message: "User Deleted!!!!",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      details: error,
    });
  }
};

export const userController = {
  createUser,
  getUser,
  getUserID,
  updateUser,
  deleteUser,
};
