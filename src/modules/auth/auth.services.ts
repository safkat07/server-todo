import { pool } from "../../config/db";
import bycrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../../config";

const loginUser = async (email: string, password: string) => {
  const result = await pool.query(`SELECT * FROM users WHERE email=$1`, [
    email,
  ]);
  //   console.log(result.rows.length);

  if (result.rows.length === 0) {
    return { success: false, message: "User not found" };
  }

  const user = result.rows[0];
  const match = await bycrypt.compare(password, user.password);

  if (!match) {
    return { success: false, message: "Invalid password" };
  }

  const token = jwt.sign(
    {
      name: user.name,  
      email: user.email,
      role: user.role,
    },
    config.secret as string,
    { expiresIn: "1h" },
  );

  console.log({ token });
  return { token, user };
};

export const authServices = {
  loginUser,
};
